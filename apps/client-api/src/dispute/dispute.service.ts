import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DisputeEntity } from './entities/dispute.entity';
import { ViolationEntity } from './entities/violation.entity';
import { DisputeLetterEntity } from './entities/dispute-letter.entity';
import { DisputeTimelineEntity } from './entities/dispute-timeline.entity';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeDto } from './dto/update-dispute.dto';

@Injectable()
export class DisputeService {
  private readonly logger = new Logger(DisputeService.name);

  constructor(
    @InjectRepository(DisputeEntity)
    private disputeRepository: Repository<DisputeEntity>,
    @InjectRepository(ViolationEntity)
    private violationRepository: Repository<ViolationEntity>,
    @InjectRepository(DisputeLetterEntity)
    private letterRepository: Repository<DisputeLetterEntity>,
    @InjectRepository(DisputeTimelineEntity)
    private timelineRepository: Repository<DisputeTimelineEntity>,
  ) {}

  /**
   * Create a new dispute
   */
  async create(createDisputeDto: CreateDisputeDto): Promise<DisputeEntity> {
    const dispute = this.disputeRepository.create({
      ...createDisputeDto,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedDispute = await this.disputeRepository.save(dispute);
    
    // Create initial timeline entry
    await this.addTimelineEntry(savedDispute.id, {
      status: 'created',
      description: 'Dispute created',
      timestamp: new Date(),
    });

    return savedDispute;
  }

  /**
   * Find all disputes with optional filtering
   */
  async findAll(filters: any = {}, page = 1, limit = 10): Promise<{ disputes: DisputeEntity[]; total: number }> {
    const [disputes, total] = await this.disputeRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['violations', 'letters', 'timeline'],
    });

    return { disputes, total };
  }

  /**
   * Find disputes by user ID
   */
  async findByUserId(userId: string, page = 1, limit = 10): Promise<{ disputes: DisputeEntity[]; total: number }> {
    return this.findAll({ userId }, page, limit);
  }

  /**
   * Find a dispute by ID
   */
  async findOne(id: string): Promise<DisputeEntity> {
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
   * Update a dispute
   */
  async update(id: string, updateDisputeDto: UpdateDisputeDto): Promise<DisputeEntity> {
    const dispute = await this.findOne(id);
    
    // Update dispute fields
    Object.assign(dispute, {
      ...updateDisputeDto,
      updatedAt: new Date(),
    });

    // If status changed, add timeline entry
    if (updateDisputeDto.status && updateDisputeDto.status !== dispute.status) {
      await this.addTimelineEntry(id, {
        status: updateDisputeDto.status,
        description: `Dispute status changed to ${updateDisputeDto.status}`,
        timestamp: new Date(),
      });
    }

    return this.disputeRepository.save(dispute);
  }

  /**
   * Remove a dispute
   */
  async remove(id: string): Promise<void> {
    const dispute = await this.findOne(id);
    await this.disputeRepository.remove(dispute);
  }

  /**
   * Add violations to a dispute
   */
  async addViolations(disputeId: string, violations: any[]): Promise<ViolationEntity[]> {
    const dispute = await this.findOne(disputeId);
    
    const violationEntities = violations.map(violation => 
      this.violationRepository.create({
        ...violation,
        disputeId: dispute.id,
        createdAt: new Date(),
      })
    );

    const savedViolations = await this.violationRepository.save(violationEntities);
    
    // Add timeline entry
    await this.addTimelineEntry(disputeId, {
      status: 'violations_detected',
      description: `${savedViolations.length} violations detected`,
      timestamp: new Date(),
    });

    return savedViolations;
  }

  /**
   * Generate dispute letter
   */
  async generateLetter(disputeId: string, templateId: string): Promise<DisputeLetterEntity> {
    const dispute = await this.findOne(disputeId);
    
    // Here we would integrate with a letter generation service
    // For now, we'll create a placeholder letter
    const letter = this.letterRepository.create({
      disputeId: dispute.id,
      content: `This is a placeholder for the dispute letter content using template ${templateId}`,
      templateId,
      generatedAt: new Date(),
      status: 'draft',
    });

    const savedLetter = await this.letterRepository.save(letter);
    
    // Add timeline entry
    await this.addTimelineEntry(disputeId, {
      status: 'letter_generated',
      description: 'Dispute letter generated',
      timestamp: new Date(),
    });

    return savedLetter;
  }

  /**
   * Submit dispute to credit bureau
   */
  async submitDispute(disputeId: string, bureauId: string): Promise<DisputeEntity> {
    const dispute = await this.findOne(disputeId);
    
    // Update dispute status
    dispute.status = 'submitted';
    dispute.submittedAt = new Date();
    dispute.updatedAt = new Date();
    
    // Add timeline entry
    await this.addTimelineEntry(disputeId, {
      status: 'submitted',
      description: `Dispute submitted to bureau ${bureauId}`,
      timestamp: new Date(),
    });

    return this.disputeRepository.save(dispute);
  }

  /**
   * Escalate dispute to CFPB or State AG
   */
  async escalateDispute(disputeId: string, escalationType: 'CFPB' | 'STATE_AG', details: any): Promise<DisputeEntity> {
    const dispute = await this.findOne(disputeId);
    
    // Update dispute status
    dispute.status = 'escalated';
    dispute.escalatedAt = new Date();
    dispute.escalationType = escalationType;
    dispute.escalationDetails = details;
    dispute.updatedAt = new Date();
    
    // Add timeline entry
    await this.addTimelineEntry(disputeId, {
      status: 'escalated',
      description: `Dispute escalated to ${escalationType}`,
      timestamp: new Date(),
    });

    return this.disputeRepository.save(dispute);
  }

  /**
   * Add timeline entry to dispute
   */
  async addTimelineEntry(disputeId: string, entry: any): Promise<DisputeTimelineEntity> {
    const timelineEntry = this.timelineRepository.create({
      disputeId,
      status: entry.status,
      description: entry.description,
      timestamp: entry.timestamp || new Date(),
      metadata: entry.metadata || {},
    });

    return this.timelineRepository.save(timelineEntry);
  }

  /**
   * Get dispute timeline
   */
  async getTimeline(disputeId: string): Promise<DisputeTimelineEntity[]> {
    return this.timelineRepository.find({
      where: { disputeId },
      order: { timestamp: 'ASC' },
    });
  }

  /**
   * Get dispute statistics
   */
  async getStatistics(userId?: string): Promise<any> {
    const queryBuilder = this.disputeRepository.createQueryBuilder('dispute');
    
    if (userId) {
      queryBuilder.where('dispute.userId = :userId', { userId });
    }
    
    const totalDisputes = await queryBuilder.getCount();
    
    const statusCounts = await queryBuilder
      .select('dispute.status', 'status')
      .addSelect('COUNT(dispute.id)', 'count')
      .groupBy('dispute.status')
      .getRawMany();
    
    return {
      total: totalDisputes,
      byStatus: statusCounts.reduce((acc, curr) => {
        acc[curr.status] = parseInt(curr.count, 10);
        return acc;
      }, {}),
    };
  }
}
