import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { DisputeEntity } from './dispute.entity';

@Entity('dispute_timeline')
export class DisputeTimelineEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  disputeId: string;

  @Column({ length: 255 })
  status: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  // Relationships
  @ManyToOne(() => DisputeEntity, dispute => dispute.timeline)
  @JoinColumn({ name: 'disputeId' })
  dispute: DisputeEntity;
}
