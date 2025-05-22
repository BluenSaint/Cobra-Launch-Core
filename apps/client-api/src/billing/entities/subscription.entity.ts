import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { PaymentEntity } from './payment.entity';

@Entity('subscriptions')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ length: 255 })
  stripeCustomerId: string;

  @Column({ length: 255 })
  stripeSubscriptionId: string;

  @Column({ length: 255 })
  stripePriceId: string;

  @Column({ 
    type: 'enum', 
    enum: ['free', 'shield', 'elite', 'infinity'],
    default: 'free'
  })
  plan: string;

  @Column({ 
    type: 'enum', 
    enum: ['incomplete', 'incomplete_expired', 'trialing', 'active', 'past_due', 'canceled', 'unpaid'],
    default: 'incomplete'
  })
  status: string;

  @Column({ type: 'timestamp' })
  currentPeriodStart: Date;

  @Column({ type: 'timestamp' })
  currentPeriodEnd: Date;

  @Column({ type: 'boolean', default: false })
  cancelAtPeriodEnd: boolean;

  @Column({ type: 'timestamp', nullable: true })
  canceledAt: Date;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Virtual field for client secret (not stored in database)
  clientSecret?: string;

  // Relationships
  @OneToMany(() => PaymentEntity, payment => payment.subscription)
  payments: PaymentEntity[];
}
