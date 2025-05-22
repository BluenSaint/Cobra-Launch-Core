import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EscalationEntity } from './escalation.entity';

@Entity('escalation_documents')
export class EscalationDocumentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  escalationId: string;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255 })
  fileUrl: string;

  @Column({ length: 255, nullable: true })
  fileType: string;

  @Column({ type: 'int', nullable: true })
  fileSize: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: ['evidence', 'correspondence', 'form', 'other'], default: 'evidence' })
  documentType: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  uploadedAt: Date;

  // Relationships
  @ManyToOne(() => EscalationEntity, escalation => escalation.documents)
  @JoinColumn({ name: 'escalationId' })
  escalation: EscalationEntity;
}
