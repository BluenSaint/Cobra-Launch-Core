import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { SubscriptionEntity } from './entities/subscription.entity';
import { PaymentEntity } from './entities/payment.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import Stripe from 'stripe';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);
  private readonly stripe: Stripe;

  constructor(
    @InjectRepository(SubscriptionEntity)
    private subscriptionRepository: Repository<SubscriptionEntity>,
    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentEntity>,
    private configService: ConfigService,
  ) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2023-10-16',
    });
  }

  /**
   * Create a new customer in Stripe
   */
  async createCustomer(userId: string, email: string, name: string): Promise<string> {
    try {
      const customer = await this.stripe.customers.create({
        email,
        name,
        metadata: {
          userId,
        },
      });

      this.logger.log(`Created Stripe customer for user ${userId}: ${customer.id}`);
      return customer.id;
    } catch (error) {
      this.logger.error(`Error creating Stripe customer: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Create a subscription for a user
   */
  async createSubscription(
    userId: string,
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<SubscriptionEntity> {
    try {
      // Create Stripe subscription
      const subscription = await this.stripe.subscriptions.create({
        customer: createSubscriptionDto.stripeCustomerId,
        items: [{ price: createSubscriptionDto.stripePriceId }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });

      // Create subscription record in database
      const newSubscription = this.subscriptionRepository.create({
        userId,
        stripeCustomerId: createSubscriptionDto.stripeCustomerId,
        stripeSubscriptionId: subscription.id,
        stripePriceId: createSubscriptionDto.stripePriceId,
        plan: createSubscriptionDto.plan,
        status: subscription.status,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const savedSubscription = await this.subscriptionRepository.save(newSubscription);
      
      // Return client secret for payment confirmation
      const invoice = subscription.latest_invoice as Stripe.Invoice;
      const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;
      
      if (paymentIntent) {
        savedSubscription.clientSecret = paymentIntent.client_secret;
      }

      return savedSubscription;
    } catch (error) {
      this.logger.error(`Error creating subscription: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Get subscription by ID
   */
  async getSubscriptionById(id: string): Promise<SubscriptionEntity> {
    return this.subscriptionRepository.findOne({
      where: { id },
      relations: ['payments'],
    });
  }

  /**
   * Get subscriptions by user ID
   */
  async getSubscriptionsByUserId(userId: string): Promise<SubscriptionEntity[]> {
    return this.subscriptionRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      relations: ['payments'],
    });
  }

  /**
   * Get active subscription by user ID
   */
  async getActiveSubscriptionByUserId(userId: string): Promise<SubscriptionEntity | null> {
    return this.subscriptionRepository.findOne({
      where: { 
        userId,
        status: 'active',
      },
      order: { createdAt: 'DESC' },
      relations: ['payments'],
    });
  }

  /**
   * Update subscription
   */
  async updateSubscription(
    id: string,
    updateSubscriptionDto: UpdateSubscriptionDto,
  ): Promise<SubscriptionEntity> {
    const subscription = await this.getSubscriptionById(id);
    
    if (updateSubscriptionDto.stripePriceId && updateSubscriptionDto.stripePriceId !== subscription.stripePriceId) {
      // Update subscription plan in Stripe
      await this.stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        items: [
          {
            id: (await this.stripe.subscriptions.retrieve(subscription.stripeSubscriptionId)).items.data[0].id,
            price: updateSubscriptionDto.stripePriceId,
          },
        ],
      });
      
      subscription.stripePriceId = updateSubscriptionDto.stripePriceId;
      subscription.plan = updateSubscriptionDto.plan || subscription.plan;
    }
    
    if (updateSubscriptionDto.cancelAtPeriodEnd !== undefined) {
      // Update cancellation status in Stripe
      await this.stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        cancel_at_period_end: updateSubscriptionDto.cancelAtPeriodEnd,
      });
      
      subscription.cancelAtPeriodEnd = updateSubscriptionDto.cancelAtPeriodEnd;
    }
    
    subscription.updatedAt = new Date();
    
    return this.subscriptionRepository.save(subscription);
  }

  /**
   * Cancel subscription
   */
  async cancelSubscription(id: string, cancelImmediately = false): Promise<SubscriptionEntity> {
    const subscription = await this.getSubscriptionById(id);
    
    if (cancelImmediately) {
      // Cancel immediately
      await this.stripe.subscriptions.cancel(subscription.stripeSubscriptionId);
      
      subscription.status = 'canceled';
      subscription.canceledAt = new Date();
    } else {
      // Cancel at period end
      await this.stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        cancel_at_period_end: true,
      });
      
      subscription.cancelAtPeriodEnd = true;
    }
    
    subscription.updatedAt = new Date();
    
    return this.subscriptionRepository.save(subscription);
  }

  /**
   * Create a checkout session for subscription
   */
  async createCheckoutSession(
    userId: string,
    stripeCustomerId: string,
    stripePriceId: string,
    successUrl: string,
    cancelUrl: string,
  ): Promise<string> {
    const session = await this.stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
      },
    });
    
    return session.url;
  }

  /**
   * Create a billing portal session
   */
  async createBillingPortalSession(
    stripeCustomerId: string,
    returnUrl: string,
  ): Promise<string> {
    const session = await this.stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: returnUrl,
    });
    
    return session.url;
  }

  /**
   * Handle Stripe webhook events
   */
  async handleWebhookEvent(
    signature: string,
    payload: Buffer,
  ): Promise<void> {
    try {
      const webhookSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret,
      );
      
      this.logger.log(`Processing webhook event: ${event.type}`);
      
      switch (event.type) {
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
          await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
          break;
          
        case 'customer.subscription.deleted':
          await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
          break;
          
        case 'invoice.payment_succeeded':
          await this.handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
          break;
          
        case 'invoice.payment_failed':
          await this.handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
          break;
      }
    } catch (error) {
      this.logger.error(`Error handling webhook: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Handle subscription updated event
   */
  private async handleSubscriptionUpdated(stripeSubscription: Stripe.Subscription): Promise<void> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { stripeSubscriptionId: stripeSubscription.id },
    });
    
    if (!subscription) {
      this.logger.warn(`Subscription not found for Stripe ID: ${stripeSubscription.id}`);
      return;
    }
    
    subscription.status = stripeSubscription.status;
    subscription.currentPeriodStart = new Date(stripeSubscription.current_period_start * 1000);
    subscription.currentPeriodEnd = new Date(stripeSubscription.current_period_end * 1000);
    subscription.cancelAtPeriodEnd = stripeSubscription.cancel_at_period_end;
    
    if (stripeSubscription.canceled_at) {
      subscription.canceledAt = new Date(stripeSubscription.canceled_at * 1000);
    }
    
    subscription.updatedAt = new Date();
    
    await this.subscriptionRepository.save(subscription);
  }

  /**
   * Handle subscription deleted event
   */
  private async handleSubscriptionDeleted(stripeSubscription: Stripe.Subscription): Promise<void> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { stripeSubscriptionId: stripeSubscription.id },
    });
    
    if (!subscription) {
      this.logger.warn(`Subscription not found for Stripe ID: ${stripeSubscription.id}`);
      return;
    }
    
    subscription.status = 'canceled';
    subscription.canceledAt = new Date(stripeSubscription.canceled_at * 1000);
    subscription.updatedAt = new Date();
    
    await this.subscriptionRepository.save(subscription);
  }

  /**
   * Handle invoice payment succeeded event
   */
  private async handleInvoicePaymentSucceeded(invoice: Stripe.Invoice): Promise<void> {
    if (!invoice.subscription) return;
    
    const subscription = await this.subscriptionRepository.findOne({
      where: { stripeSubscriptionId: invoice.subscription as string },
    });
    
    if (!subscription) {
      this.logger.warn(`Subscription not found for invoice: ${invoice.id}`);
      return;
    }
    
    // Create payment record
    const payment = this.paymentRepository.create({
      subscriptionId: subscription.id,
      stripeInvoiceId: invoice.id,
      stripePaymentIntentId: invoice.payment_intent as string,
      amount: invoice.amount_paid / 100, // Convert from cents
      currency: invoice.currency,
      status: 'succeeded',
      paymentMethod: invoice.payment_method_details?.type || 'unknown',
      createdAt: new Date(),
    });
    
    await this.paymentRepository.save(payment);
    
    // Update subscription if needed
    if (subscription.status !== 'active') {
      subscription.status = 'active';
      subscription.updatedAt = new Date();
      await this.subscriptionRepository.save(subscription);
    }
  }

  /**
   * Handle invoice payment failed event
   */
  private async handleInvoicePaymentFailed(invoice: Stripe.Invoice): Promise<void> {
    if (!invoice.subscription) return;
    
    const subscription = await this.subscriptionRepository.findOne({
      where: { stripeSubscriptionId: invoice.subscription as string },
    });
    
    if (!subscription) {
      this.logger.warn(`Subscription not found for invoice: ${invoice.id}`);
      return;
    }
    
    // Create payment record
    const payment = this.paymentRepository.create({
      subscriptionId: subscription.id,
      stripeInvoiceId: invoice.id,
      stripePaymentIntentId: invoice.payment_intent as string,
      amount: invoice.amount_due / 100, // Convert from cents
      currency: invoice.currency,
      status: 'failed',
      paymentMethod: invoice.payment_method_details?.type || 'unknown',
      createdAt: new Date(),
    });
    
    await this.paymentRepository.save(payment);
    
    // Update subscription status if needed
    if (invoice.next_payment_attempt === null) {
      subscription.status = 'past_due';
      subscription.updatedAt = new Date();
      await this.subscriptionRepository.save(subscription);
    }
  }

  /**
   * List available subscription plans
   */
  async listSubscriptionPlans(): Promise<any[]> {
    const prices = await this.stripe.prices.list({
      active: true,
      type: 'recurring',
      expand: ['data.product'],
    });
    
    return prices.data.map(price => {
      const product = price.product as Stripe.Product;
      return {
        id: price.id,
        productId: product.id,
        name: product.name,
        description: product.description,
        amount: price.unit_amount / 100,
        currency: price.currency,
        interval: price.recurring.interval,
        intervalCount: price.recurring.interval_count,
        metadata: product.metadata,
      };
    });
  }

  /**
   * Check if user has active subscription
   */
  async hasActiveSubscription(userId: string): Promise<boolean> {
    const subscription = await this.getActiveSubscriptionByUserId(userId);
    return !!subscription;
  }

  /**
   * Get user subscription tier
   */
  async getUserSubscriptionTier(userId: string): Promise<string> {
    const subscription = await this.getActiveSubscriptionByUserId(userId);
    
    if (!subscription) {
      return 'free';
    }
    
    return subscription.plan;
  }

  /**
   * Check if user has access to feature based on subscription
   */
  async hasFeatureAccess(userId: string, feature: string): Promise<boolean> {
    const tier = await this.getUserSubscriptionTier(userId);
    
    // Define feature access by tier
    const featureAccess = {
      free: ['basic_disputes', 'report_upload'],
      shield: ['basic_disputes', 'report_upload', 'automated_disputes', 'document_storage'],
      elite: ['basic_disputes', 'report_upload', 'automated_disputes', 'document_storage', 'escalations', 'priority_support'],
      infinity: ['basic_disputes', 'report_upload', 'automated_disputes', 'document_storage', 'escalations', 'priority_support', 'unlimited_disputes', 'white_glove'],
    };
    
    return featureAccess[tier]?.includes(feature) || false;
  }
}
