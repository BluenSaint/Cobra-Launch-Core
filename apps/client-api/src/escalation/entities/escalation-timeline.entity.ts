import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EscalationEntity } from './escalation.entity';

@Entity('escalation_timeline')
export class EscalationTimelineEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  escalationId: string;

  @Column({ length: 255 })
  status: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  // Relationships
  @ManyToOne(() => EscalationEntity, escalation => escalation.timeline)
  @JoinColumn({ name: 'escalationId' })
  escalation: EscalationEntity;
}
