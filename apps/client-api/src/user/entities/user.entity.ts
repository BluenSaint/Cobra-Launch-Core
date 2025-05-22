import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255 })
  firstName: string;

  @Column({ length: 255 })
  lastName: string;

  @Column({ length: 255, nullable: true })
  passwordHash: string;

  @Column({ 
    type: 'enum', 
    enum: ['user', 'admin', 'support'],
    default: 'user'
  })
  role: string;

  @Column({ 
    type: 'enum', 
    enum: ['active', 'inactive', 'suspended', 'pending'],
    default: 'pending'
  })
  status: string;

  @Column({ length: 255, nullable: true })
  stripeCustomerId: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt: Date;
}
