import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('audit_logs')
export class AuditLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ 
    type: 'enum', 
    enum: ['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'ERROR', 'UPDATE_DISPUTE', 'UPDATE_ESCALATION', 'UPDATE_SUBSCRIPTION', 'ADMIN_ACTION', 'OTHER'],
  })
  action: string;

  @Column({ length: 255, nullable: true })
  entityId: string;

  @Column({ 
    type: 'enum', 
    enum: ['USER', 'DISPUTE', 'ESCALATION', 'OCR', 'SUBSCRIPTION', 'PAYMENT', 'SYSTEM', 'OTHER'],
    nullable: true,
  })
  entityType: string;

  @Column({ type: 'text', nullable: true })
  details: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @Column({ type: 'inet', nullable: true })
  ipAddress: string;

  @Column({ length: 255, nullable: true })
  userAgent: string;

  @CreateDateColumn()
  timestamp: Date;
}
