import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SubscriptionEntity } from './subscription.entity';

@Entity('payments')
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  subscriptionId: string;

  @Column({ length: 255 })
  stripeInvoiceId: string;

  @Column({ length: 255, nullable: true })
  stripePaymentIntentId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ length: 3 })
  currency: string;

  @Column({ 
    type: 'enum', 
    enum: ['succeeded', 'failed', 'pending'],
    default: 'pending'
  })
  status: string;

  @Column({ length: 50, nullable: true })
  paymentMethod: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  // Relationships
  @ManyToOne(() => SubscriptionEntity, subscription => subscription.payments)
  @JoinColumn({ name: 'subscriptionId' })
  subscription: SubscriptionEntity;
}
