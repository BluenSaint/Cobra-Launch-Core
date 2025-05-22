import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { DisputeEntity } from './dispute.entity';

@Entity('violations')
export class ViolationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  disputeId: string;

  @Column({ type: 'enum', enum: ['FCRA', 'FDCPA', 'TCPA', 'FCBA', 'OTHER'] })
  type: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  regulationReference: string;

  @Column({ type: 'enum', enum: ['low', 'medium', 'high'], default: 'medium' })
  severity: string;

  @Column({ type: 'float', default: 0.0 })
  confidence: number;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @Column({ type: 'text', nullable: true })
  remedyInstructions: string;

  @CreateDateColumn()
  createdAt: Date;

  // Relationships
  @ManyToOne(() => DisputeEntity, dispute => dispute.violations)
  @JoinColumn({ name: 'disputeId' })
  dispute: DisputeEntity;
}
