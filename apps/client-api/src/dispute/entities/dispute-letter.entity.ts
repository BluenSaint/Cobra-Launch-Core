import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { DisputeEntity } from './dispute.entity';

@Entity('dispute_letters')
export class DisputeLetterEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  disputeId: string;

  @Column({ length: 255, nullable: true })
  templateId: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'enum', enum: ['draft', 'final', 'sent', 'delivered'], default: 'draft' })
  status: string;

  @Column({ nullable: true })
  sentAt: Date;

  @Column({ nullable: true })
  deliveredAt: Date;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  generatedAt: Date;

  // Relationships
  @ManyToOne(() => DisputeEntity, dispute => dispute.letters)
  @JoinColumn({ name: 'disputeId' })
  dispute: DisputeEntity;
}
