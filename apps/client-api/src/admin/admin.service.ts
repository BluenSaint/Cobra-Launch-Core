import { Injectable, Logger, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { DisputeEntity } from '../dispute/entities/dispute.entity';
import { EscalationEntity } from '../escalation/entities/escalation.entity';
import { OcrResultEntity } from '../ocr/entities/ocr-result.entity';
import { SubscriptionEntity } from '../billing/entities/subscription.entity';
import { AuditLogEntity } from './entities/audit-log.entity';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(DisputeEntity)
    private disputeRepository: Repository<DisputeEntity>,
    @InjectRepository(EscalationEntity)
    private escalationRepository: Repository<EscalationEntity>,
    @InjectRepository(OcrResultEntity)
    private ocrResultRepository: Repository<OcrResultEntity>,
    @InjectRepository(SubscriptionEntity)
    private subscriptionRepository: Repository<SubscriptionEntity>,
    @InjectRepository(AuditLogEntity)
    private auditLogRepository: Repository<AuditLogEntity>,
  ) {}

  /**
   * Check if user has admin privileges
   */
  async isAdmin(userId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    return user?.role === 'admin';
  }

  /**
   * Verify admin access
   */
  async verifyAdminAccess(userId: string): Promise<void> {
    const isAdmin = await this.isAdmin(userId);
    if (!isAdmin) {
      throw new ForbiddenException('Admin access required');
    }
  }

  /**
   * Get dashboard statistics
   */
  async getDashboardStats(): Promise<any> {
    // User statistics
    const totalUsers = await this.userRepository.count();
    const activeUsers = await this.userRepository.count({
      where: { status: 'active' },
    });

    // Subscription statistics
    const totalSubscriptions = await this.subscriptionRepository.count();
    const activeSubscriptions = await this.subscriptionRepository.count({
      where: { status: 'active' },
    });
    
    // Subscription by plan
    const subscriptionsByPlan = await this.subscriptionRepository
      .createQueryBuilder('subscription')
      .select('subscription.plan', 'plan')
      .addSelect('COUNT(subscription.id)', 'count')
      .where('subscription.status = :status', { status: 'active' })
      .groupBy('subscription.plan')
      .getRawMany();

    // Dispute statistics
    const totalDisputes = await this.disputeRepository.count();
    const pendingDisputes = await this.disputeRepository.count({
      where: { status: 'pending' },
    });
    const successfulDisputes = await this.disputeRepository.count({
      where: { status: 'successful' },
    });

    // Escalation statistics
    const totalEscalations = await this.escalationRepository.count();
    const pendingEscalations = await this.escalationRepository.count({
      where: { status: 'pending' },
    });

    // OCR statistics
    const totalOcrResults = await this.ocrResultRepository.count();
    const successfulOcrResults = await this.ocrResultRepository.count({
      where: { status: 'completed' },
    });

    // Recent activity
    const recentActivity = await this.auditLogRepository.find({
      order: { timestamp: 'DESC' },
      take: 10,
    });

    // Monthly dispute statistics
    const now = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 6);

    const monthlyDisputeStats = await this.disputeRepository
      .createQueryBuilder('dispute')
      .select('DATE_TRUNC(\'month\', dispute.createdAt)', 'month')
      .addSelect('COUNT(dispute.id)', 'count')
      .addSelect('dispute.status', 'status')
      .where('dispute.createdAt >= :sixMonthsAgo', { sixMonthsAgo })
      .groupBy('month')
      .addGroupBy('dispute.status')
      .orderBy('month', 'ASC')
      .getRawMany();

    return {
      users: {
        total: totalUsers,
        active: activeUsers,
      },
      subscriptions: {
        total: totalSubscriptions,
        active: activeSubscriptions,
        byPlan: subscriptionsByPlan.reduce((acc, curr) => {
          acc[curr.plan] = parseInt(curr.count, 10);
          return acc;
        }, {}),
      },
      disputes: {
        total: totalDisputes,
        pending: pendingDisputes,
        successful: successfulDisputes,
        successRate: totalDisputes > 0 ? (successfulDisputes / totalDisputes) * 100 : 0,
      },
      escalations: {
        total: totalEscalations,
        pending: pendingEscalations,
      },
      ocr: {
        total: totalOcrResults,
        successful: successfulOcrResults,
        successRate: totalOcrResults > 0 ? (successfulOcrResults / totalOcrResults) * 100 : 0,
      },
      recentActivity,
      monthlyDisputeStats,
    };
  }

  /**
   * Get all users with pagination
   */
  async getAllUsers(page = 1, limit = 10, filters = {}): Promise<{ users: UserEntity[]; total: number }> {
    const [users, total] = await this.userRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { users, total };
  }

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['subscriptions'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  /**
   * Update user
   */
  async updateUser(id: string, userData: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.getUserById(id);
    
    // Update user fields
    Object.assign(user, {
      ...userData,
      updatedAt: new Date(),
    });

    return this.userRepository.save(user);
  }

  /**
   * Get all disputes with pagination
   */
  async getAllDisputes(page = 1, limit = 10, filters = {}): Promise<{ disputes: DisputeEntity[]; total: number }> {
    const [disputes, total] = await this.disputeRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['violations'],
    });

    return { disputes, total };
  }

  /**
   * Get dispute by ID
   */
  async getDisputeById(id: string): Promise<DisputeEntity> {
    const dispute = await this.disputeRepository.findOne({
      where: { id },
      relations: ['violations', 'letters', 'timeline'],
    });

    if (!dispute) {
      throw new NotFoundException(`Dispute with ID ${id} not found`);
    }

    return dispute;
  }

  /**
   * Update dispute
   */
  async updateDispute(id: string, disputeData: Partial<DisputeEntity>, adminId: string): Promise<DisputeEntity> {
    const dispute = await this.getDisputeById(id);
    
    // Update dispute fields
    Object.assign(dispute, {
      ...disputeData,
      updatedAt: new Date(),
    });

    // Create audit log
    await this.createAuditLog({
      action: 'UPDATE_DISPUTE',
      entityId: id,
      entityType: 'DISPUTE',
      userId: adminId,
      details: `Dispute updated by admin: ${JSON.stringify(disputeData)}`,
    });

    return this.disputeRepository.save(dispute);
  }

  /**
   * Get all escalations with pagination
   */
  async getAllEscalations(page = 1, limit = 10, filters = {}): Promise<{ escalations: EscalationEntity[]; total: number }> {
    const [escalations, total] = await this.escalationRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['documents', 'timeline'],
    });

    return { escalations, total };
  }

  /**
   * Get escalation by ID
   */
  async getEscalationById(id: string): Promise<EscalationEntity> {
    const escalation = await this.escalationRepository.findOne({
      where: { id },
      relations: ['documents', 'timeline'],
    });

    if (!escalation) {
      throw new NotFoundException(`Escalation with ID ${id} not found`);
    }

    return escalation;
  }

  /**
   * Update escalation
   */
  async updateEscalation(id: string, escalationData: Partial<EscalationEntity>, adminId: string): Promise<EscalationEntity> {
    const escalation = await this.getEscalationById(id);
    
    // Update escalation fields
    Object.assign(escalation, {
      ...escalationData,
      updatedAt: new Date(),
    });

    // Create audit log
    await this.createAuditLog({
      action: 'UPDATE_ESCALATION',
      entityId: id,
      entityType: 'ESCALATION',
      userId: adminId,
      details: `Escalation updated by admin: ${JSON.stringify(escalationData)}`,
    });

    return this.escalationRepository.save(escalation);
  }

  /**
   * Get all subscriptions with pagination
   */
  async getAllSubscriptions(page = 1, limit = 10, filters = {}): Promise<{ subscriptions: SubscriptionEntity[]; total: number }> {
    const [subscriptions, total] = await this.subscriptionRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['payments'],
    });

    return { subscriptions, total };
  }

  /**
   * Get subscription by ID
   */
  async getSubscriptionById(id: string): Promise<SubscriptionEntity> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id },
      relations: ['payments'],
    });

    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }

    return subscription;
  }

  /**
   * Update subscription
   */
  async updateSubscription(id: string, subscriptionData: Partial<SubscriptionEntity>, adminId: string): Promise<SubscriptionEntity> {
    const subscription = await this.getSubscriptionById(id);
    
    // Update subscription fields
    Object.assign(subscription, {
      ...subscriptionData,
      updatedAt: new Date(),
    });

    // Create audit log
    await this.createAuditLog({
      action: 'UPDATE_SUBSCRIPTION',
      entityId: id,
      entityType: 'SUBSCRIPTION',
      userId: adminId,
      details: `Subscription updated by admin: ${JSON.stringify(subscriptionData)}`,
    });

    return this.subscriptionRepository.save(subscription);
  }

  /**
   * Get all OCR results with pagination
   */
  async getAllOcrResults(page = 1, limit = 10, filters = {}): Promise<{ results: OcrResultEntity[]; total: number }> {
    const [results, total] = await this.ocrResultRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['violations'],
    });

    return { results, total };
  }

  /**
   * Get OCR result by ID
   */
  async getOcrResultById(id: string): Promise<OcrResultEntity> {
    const result = await this.ocrResultRepository.findOne({
      where: { id },
      relations: ['violations'],
    });

    if (!result) {
      throw new NotFoundException(`OCR result with ID ${id} not found`);
    }

    return result;
  }

  /**
   * Get all audit logs with pagination
   */
  async getAllAuditLogs(page = 1, limit = 10, filters = {}): Promise<{ logs: AuditLogEntity[]; total: number }> {
    const [logs, total] = await this.auditLogRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
      order: { timestamp: 'DESC' },
    });

    return { logs, total };
  }

  /**
   * Create audit log
   */
  async createAuditLog(createAuditLogDto: CreateAuditLogDto): Promise<AuditLogEntity> {
    const auditLog = this.auditLogRepository.create({
      ...createAuditLogDto,
      timestamp: new Date(),
    });

    return this.auditLogRepository.save(auditLog);
  }

  /**
   * Get system health status
   */
  async getSystemHealth(): Promise<any> {
    // Database status
    const dbStatus = await this.checkDatabaseStatus();

    // API status
    const apiStatus = {
      status: 'healthy',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    };

    // Recent errors
    const recentErrors = await this.auditLogRepository.find({
      where: { action: 'ERROR' },
      order: { timestamp: 'DESC' },
      take: 10,
    });

    return {
      database: dbStatus,
      api: apiStatus,
      recentErrors,
      timestamp: new Date(),
    };
  }

  /**
   * Check database status
   */
  private async checkDatabaseStatus(): Promise<any> {
    try {
      // Simple query to check database connection
      await this.userRepository.count();
      
      return {
        status: 'connected',
        message: 'Database connection successful',
      };
    } catch (error) {
      this.logger.error(`Database connection error: ${error.message}`, error.stack);
      
      return {
        status: 'error',
        message: `Database connection error: ${error.message}`,
      };
    }
  }
}
