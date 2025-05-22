import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { OcrResultEntity } from './ocr-result.entity';

@Entity('ocr_violations')
export class OcrViolationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  resultId: string;

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

  @CreateDateColumn()
  createdAt: Date;

  // Relationships
  @ManyToOne(() => OcrResultEntity, result => result.violations)
  @JoinColumn({ name: 'resultId' })
  result: OcrResultEntity;
}
