import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import Stripe from 'stripe';

@Injectable()
export class BillingService {
  private readonly stripe: Stripe;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.stripe = new Stripe(
      this.configService.get('STRIPE_SECRET_KEY', ''),
      {
        apiVersion: '2022-11-15',
      }
    );
  }

  async createCustomer(userData: any) {
    try {
      const customer = await this.stripe.customers.create({
        email: userData.email,
        name: `${userData.firstName} ${userData.lastName}`,
        phone: userData.phone,
        metadata: {
          userId: userData.userId,
        },
      });

      return {
        success: true,
        message: 'Customer created successfully',
        data: {
          customerId: customer.id,
        },
      };
    } catch (error) {
      console.error('Error creating Stripe customer:', error);
      throw new Error(`Failed to create customer: ${error.message}`);
    }
  }

  async createSubscription(data: any) {
    try {
      // Get or create price based on plan
      const priceId = await this.getPriceIdForPlan(data.plan);

      // Create subscription
      const subscription = await this.stripe.subscriptions.create({
        customer: data.customerId,
        items: [
          {
            price: priceId,
          },
        ],
        payment_behavior: 'default_incomplete',
        payment_settings: {
          save_default_payment_method: 'on_subscription',
        },
        expand: ['latest_invoice.payment_intent'],
      });

      return {
        success: true,
        message: 'Subscription created successfully',
        data: {
          subscriptionId: subscription.id,
          clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        },
      };
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw new Error(`Failed to create subscription: ${error.message}`);
    }
  }

  async cancelSubscription(subscriptionId: string) {
    try {
      const subscription = await this.stripe.subscriptions.cancel(subscriptionId);

      return {
        success: true,
        message: 'Subscription cancelled successfully',
        data: {
          subscriptionId: subscription.id,
          status: subscription.status,
        },
      };
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      throw new Error(`Failed to cancel subscription: ${error.message}`);
    }
  }

  async upgradeSubscription(data: any) {
    try {
      // Get price for new plan
      const newPriceId = await this.getPriceIdForPlan(data.newPlan);

      // Retrieve current subscription
      const subscription = await this.stripe.subscriptions.retrieve(data.subscriptionId);

      // Update subscription with new price
      const updatedSubscription = await this.stripe.subscriptions.update(data.subscriptionId, {
        items: [
          {
            id: subscription.items.data[0].id,
            price: newPriceId,
          },
        ],
        proration_behavior: 'create_prorations',
      });

      return {
        success: true,
        message: 'Subscription upgraded successfully',
        data: {
          subscriptionId: updatedSubscription.id,
          status: updatedSubscription.status,
          currentPeriodEnd: new Date(updatedSubscription.current_period_end * 1000),
        },
      };
    } catch (error) {
      console.error('Error upgrading subscription:', error);
      throw new Error(`Failed to upgrade subscription: ${error.message}`);
    }
  }

  async getSubscription(subscriptionId: string) {
    try {
      const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);

      return {
        success: true,
        data: {
          subscriptionId: subscription.id,
          status: subscription.status,
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          plan: this.getPlanFromPriceId(subscription.items.data[0].price.id),
        },
      };
    } catch (error) {
      console.error('Error retrieving subscription:', error);
      throw new Error(`Failed to retrieve subscription: ${error.message}`);
    }
  }

  async createCheckoutSession(data: any) {
    try {
      // Get price for plan
      const priceId = await this.getPriceIdForPlan(data.plan);

      // Create checkout session
      const session = await this.stripe.checkout.sessions.create({
        customer: data.customerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${data.domain}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${data.domain}/pricing?canceled=true`,
      });

      return {
        success: true,
        message: 'Checkout session created successfully',
        data: {
          sessionId: session.id,
          url: session.url,
        },
      };
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw new Error(`Failed to create checkout session: ${error.message}`);
    }
  }

  async handleWebhook(signature: string, payload: Buffer) {
    try {
      const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET', '');
      
      // Verify webhook signature
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret
      );

      // Handle different event types
      switch (event.type) {
        case 'customer.subscription.created':
          await this.handleSubscriptionCreated(event.data.object);
          break;
        case 'customer.subscription.updated':
          await this.handleSubscriptionUpdated(event.data.object);
          break;
        case 'customer.subscription.deleted':
          await this.handleSubscriptionDeleted(event.data.object);
          break;
        case 'invoice.payment_succeeded':
          await this.handleInvoicePaymentSucceeded(event.data.object);
          break;
        case 'invoice.payment_failed':
          await this.handleInvoicePaymentFailed(event.data.object);
          break;
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      return {
        success: true,
        message: `Webhook processed: ${event.type}`,
      };
    } catch (error) {
      console.error('Error handling webhook:', error);
      throw new Error(`Webhook error: ${error.message}`);
    }
  }

  // Helper methods
  private async getPriceIdForPlan(plan: string): Promise<string> {
    // In a real implementation, these would be stored in a database or config
    const planPrices = {
      'shield': 'price_shield_85',
      'elite': 'price_elite_150',
      'infinity': 'price_infinity_399',
    };

    const priceId = planPrices[plan.toLowerCase()];
    
    if (!priceId) {
      throw new Error(`Invalid plan: ${plan}`);
    }

    return priceId;
  }

  private getPlanFromPriceId(priceId: string): string {
    // In a real implementation, this would be more robust
    if (priceId.includes('shield')) return 'Shield';
    if (priceId.includes('elite')) return 'Elite';
    if (priceId.includes('infinity')) return 'Infinity';
    return 'Unknown';
  }

  // Webhook handlers
  private async handleSubscriptionCreated(subscription: any) {
    // In a real implementation, this would update the user's subscription status in the database
    console.log('Subscription created:', subscription.id);
  }

  private async handleSubscriptionUpdated(subscription: any) {
    // In a real implementation, this would update the user's subscription status in the database
    console.log('Subscription updated:', subscription.id);
  }

  private async handleSubscriptionDeleted(subscription: any) {
    // In a real implementation, this would update the user's subscription status in the database
    console.log('Subscription deleted:', subscription.id);
  }

  private async handleInvoicePaymentSucceeded(invoice: any) {
    // In a real implementation, this would update the user's payment status in the database
    console.log('Invoice payment succeeded:', invoice.id);
  }

  private async handleInvoicePaymentFailed(invoice: any) {
    // In a real implementation, this would update the user's payment status in the database
    console.log('Invoice payment failed:', invoice.id);
  }
}
