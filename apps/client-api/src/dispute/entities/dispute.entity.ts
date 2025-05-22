import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ViolationEntity } from './violation.entity';
import { DisputeLetterEntity } from './dispute-letter.entity';
import { DisputeTimelineEntity } from './dispute-timeline.entity';

@Entity('disputes')
export class DisputeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid', nullable: true })
  reportId: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'in_progress', 'submitted', 'escalated', 'successful', 'failed', 'closed'],
    default: 'pending',
  })
  status: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @Column({ type: 'enum', enum: ['CFPB', 'STATE_AG'], nullable: true })
  escalationType: string;

  @Column({ type: 'jsonb', nullable: true })
  escalationDetails: Record<string, any>;

  @Column({ nullable: true })
  submittedAt: Date;

  @Column({ nullable: true })
  escalatedAt: Date;

  @Column({ nullable: true })
  resolvedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @OneToMany(() => ViolationEntity, violation => violation.dispute)
  violations: ViolationEntity[];

  @OneToMany(() => DisputeLetterEntity, letter => letter.dispute)
  letters: DisputeLetterEntity[];

  @OneToMany(() => DisputeTimelineEntity, timeline => timeline.dispute)
  timeline: DisputeTimelineEntity[];
}
