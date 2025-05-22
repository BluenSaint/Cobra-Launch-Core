import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EscalationEntity } from './entities/escalation.entity';
import { EscalationDocumentEntity } from './entities/escalation-document.entity';
import { EscalationTimelineEntity } from './entities/escalation-timeline.entity';
import { CreateEscalationDto } from './dto/create-escalation.dto';
import { UpdateEscalationDto } from './dto/update-escalation.dto';

@Injectable()
export class EscalationService {
  private readonly logger = new Logger(EscalationService.name);

  constructor(
    @InjectRepository(EscalationEntity)
    private escalationRepository: Repository<EscalationEntity>,
    @InjectRepository(EscalationDocumentEntity)
    private documentRepository: Repository<EscalationDocumentEntity>,
    @InjectRepository(EscalationTimelineEntity)
    private timelineRepository: Repository<EscalationTimelineEntity>,
  ) {}

  /**
   * Create a new escalation
   */
  async create(createEscalationDto: CreateEscalationDto): Promise<EscalationEntity> {
    const escalation = this.escalationRepository.create({
      ...createEscalationDto,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedEscalation = await this.escalationRepository.save(escalation);
    
    // Create initial timeline entry
    await this.addTimelineEntry(savedEscalation.id, {
      status: 'created',
      description: 'Escalation created',
      timestamp: new Date(),
    });

    return savedEscalation;
  }

  /**
   * Find all escalations with optional filtering
   */
  async findAll(filters: any = {}, page = 1, limit = 10): Promise<{ escalations: EscalationEntity[]; total: number }> {
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
   * Find escalations by user ID
   */
  async findByUserId(userId: string, page = 1, limit = 10): Promise<{ escalations: EscalationEntity[]; total: number }> {
    return this.findAll({ userId }, page, limit);
  }

  /**
   * Find an escalation by ID
   */
  async findOne(id: string): Promise<EscalationEntity> {
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
   * Update an escalation
   */
  async update(id: string, updateEscalationDto: UpdateEscalationDto): Promise<EscalationEntity> {
    const escalation = await this.findOne(id);
    
    // Update escalation fields
    Object.assign(escalation, {
      ...updateEscalationDto,
      updatedAt: new Date(),
    });

    // If status changed, add timeline entry
    if (updateEscalationDto.status && updateEscalationDto.status !== escalation.status) {
      await this.addTimelineEntry(id, {
        status: updateEscalationDto.status,
        description: `Escalation status changed to ${updateEscalationDto.status}`,
        timestamp: new Date(),
      });
    }

    return this.escalationRepository.save(escalation);
  }

  /**
   * Remove an escalation
   */
  async remove(id: string): Promise<void> {
    const escalation = await this.findOne(id);
    await this.escalationRepository.remove(escalation);
  }

  /**
   * Add document to an escalation
   */
  async addDocument(escalationId: string, documentData: any): Promise<EscalationDocumentEntity> {
    const escalation = await this.findOne(escalationId);
    
    const document = this.documentRepository.create({
      escalationId: escalation.id,
      ...documentData,
      uploadedAt: new Date(),
    });

    const savedDocument = await this.documentRepository.save(document);
    
    // Add timeline entry
    await this.addTimelineEntry(escalationId, {
      status: 'document_added',
      description: `Document "${documentData.title}" added to escalation`,
      timestamp: new Date(),
    });

    return savedDocument;
  }

  /**
   * Submit escalation to CFPB
   */
  async submitToCFPB(escalationId: string, cfpbData: any): Promise<EscalationEntity> {
    const escalation = await this.findOne(escalationId);
    
    // Update escalation status
    escalation.status = 'submitted_cfpb';
    escalation.cfpbSubmissionData = cfpbData;
    escalation.cfpbSubmissionDate = new Date();
    escalation.updatedAt = new Date();
    
    // Add timeline entry
    await this.addTimelineEntry(escalationId, {
      status: 'submitted_cfpb',
      description: 'Escalation submitted to CFPB',
      timestamp: new Date(),
      metadata: { cfpbData },
    });

    return this.escalationRepository.save(escalation);
  }

  /**
   * Submit escalation to State Attorney General
   */
  async submitToStateAG(escalationId: string, stateAgData: any): Promise<EscalationEntity> {
    const escalation = await this.findOne(escalationId);
    
    // Update escalation status
    escalation.status = 'submitted_state_ag';
    escalation.stateAgSubmissionData = stateAgData;
    escalation.stateAgSubmissionDate = new Date();
    escalation.updatedAt = new Date();
    
    // Add timeline entry
    await this.addTimelineEntry(escalationId, {
      status: 'submitted_state_ag',
      description: `Escalation submitted to ${stateAgData.state} Attorney General`,
      timestamp: new Date(),
      metadata: { stateAgData },
    });

    return this.escalationRepository.save(escalation);
  }

  /**
   * Add timeline entry to escalation
   */
  async addTimelineEntry(escalationId: string, entry: any): Promise<EscalationTimelineEntity> {
    const timelineEntry = this.timelineRepository.create({
      escalationId,
      status: entry.status,
      description: entry.description,
      timestamp: entry.timestamp || new Date(),
      metadata: entry.metadata || {},
    });

    return this.timelineRepository.save(timelineEntry);
  }

  /**
   * Get escalation timeline
   */
  async getTimeline(escalationId: string): Promise<EscalationTimelineEntity[]> {
    return this.timelineRepository.find({
      where: { escalationId },
      order: { timestamp: 'ASC' },
    });
  }

  /**
   * Get escalation statistics
   */
  async getStatistics(userId?: string): Promise<any> {
    const queryBuilder = this.escalationRepository.createQueryBuilder('escalation');
    
    if (userId) {
      queryBuilder.where('escalation.userId = :userId', { userId });
    }
    
    const totalEscalations = await queryBuilder.getCount();
    
    const statusCounts = await queryBuilder
      .select('escalation.status', 'status')
      .addSelect('COUNT(escalation.id)', 'count')
      .groupBy('escalation.status')
      .getRawMany();
    
    const typeBreakdown = await queryBuilder
      .select('escalation.type', 'type')
      .addSelect('COUNT(escalation.id)', 'count')
      .groupBy('escalation.type')
      .getRawMany();
    
    return {
      total: totalEscalations,
      byStatus: statusCounts.reduce((acc, curr) => {
        acc[curr.status] = parseInt(curr.count, 10);
        return acc;
      }, {}),
      byType: typeBreakdown.reduce((acc, curr) => {
        acc[curr.type] = parseInt(curr.count, 10);
        return acc;
      }, {}),
    };
  }
}
