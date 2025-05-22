import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { EscalationDocumentEntity } from './escalation-document.entity';
import { EscalationTimelineEntity } from './escalation-timeline.entity';

@Entity('escalations')
export class EscalationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid', nullable: true })
  disputeId: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'in_progress', 'submitted_cfpb', 'submitted_state_ag', 'resolved', 'closed'],
    default: 'pending',
  })
  status: string;

  @Column({
    type: 'enum',
    enum: ['CFPB', 'STATE_AG', 'CREDIT_BUREAU', 'OTHER'],
    default: 'CFPB',
  })
  type: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  cfpbSubmissionData: Record<string, any>;

  @Column({ nullable: true })
  cfpbSubmissionDate: Date;

  @Column({ type: 'jsonb', nullable: true })
  stateAgSubmissionData: Record<string, any>;

  @Column({ nullable: true })
  stateAgSubmissionDate: Date;

  @Column({ nullable: true })
  resolvedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @OneToMany(() => EscalationDocumentEntity, document => document.escalation)
  documents: EscalationDocumentEntity[];

  @OneToMany(() => EscalationTimelineEntity, timeline => timeline.escalation)
  timeline: EscalationTimelineEntity[];
}
