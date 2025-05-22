import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { OcrViolationEntity } from './ocr-violation.entity';

@Entity('ocr_results')
export class OcrResultEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ length: 255 })
  documentPath: string;

  @Column({ 
    type: 'enum', 
    enum: ['credit_report', 'dispute_letter', 'correspondence', 'other'],
    default: 'credit_report'
  })
  documentType: string;

  @Column({ type: 'text', nullable: true })
  text: string;

  @Column({ type: 'jsonb', nullable: true })
  structuredData: Record<string, any>;

  @Column({ type: 'float', default: 0.0 })
  confidence: number;

  @Column({ length: 50, nullable: true })
  engine: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending',
  })
  status: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @OneToMany(() => OcrViolationEntity, violation => violation.result)
  violations: OcrViolationEntity[];
}
