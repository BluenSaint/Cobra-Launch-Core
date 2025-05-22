import { Controller, Get, Post, Body, Patch, Param, UseGuards, Req, Query, Delete } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('billing')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('customers')
  @ApiOperation({ summary: 'Create a new Stripe customer' })
  @ApiResponse({ status: 201, description: 'Customer created successfully.' })
  createCustomer(
    @Body() createCustomerDto: { email: string; name: string },
    @Req() req,
  ) {
    return this.billingService.createCustomer(
      req.user.id,
      createCustomerDto.email,
      createCustomerDto.name,
    );
  }

  @Post('subscriptions')
  @ApiOperation({ summary: 'Create a new subscription' })
  @ApiResponse({ status: 201, description: 'Subscription created successfully.' })
  createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
    @Req() req,
  ) {
    return this.billingService.createSubscription(req.user.id, createSubscriptionDto);
  }

  @Get('subscriptions')
  @ApiOperation({ summary: 'Get all subscriptions for the current user' })
  @ApiResponse({ status: 200, description: 'Return all subscriptions for the user.' })
  getSubscriptions(@Req() req) {
    return this.billingService.getSubscriptionsByUserId(req.user.id);
  }

  @Get('subscriptions/active')
  @ApiOperation({ summary: 'Get active subscription for the current user' })
  @ApiResponse({ status: 200, description: 'Return active subscription for the user.' })
  getActiveSubscription(@Req() req) {
    return this.billingService.getActiveSubscriptionByUserId(req.user.id);
  }

  @Get('subscriptions/:id')
  @ApiOperation({ summary: 'Get subscription by ID' })
  @ApiResponse({ status: 200, description: 'Return the subscription.' })
  getSubscription(@Param('id') id: string) {
    return this.billingService.getSubscriptionById(id);
  }

  @Patch('subscriptions/:id')
  @ApiOperation({ summary: 'Update subscription' })
  @ApiResponse({ status: 200, description: 'Subscription updated successfully.' })
  updateSubscription(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.billingService.updateSubscription(id, updateSubscriptionDto);
  }

  @Delete('subscriptions/:id')
  @ApiOperation({ summary: 'Cancel subscription' })
  @ApiResponse({ status: 200, description: 'Subscription canceled successfully.' })
  cancelSubscription(
    @Param('id') id: string,
    @Query('immediately') immediately: boolean = false,
  ) {
    return this.billingService.cancelSubscription(id, immediately);
  }

  @Post('checkout-session')
  @ApiOperation({ summary: 'Create a checkout session' })
  @ApiResponse({ status: 201, description: 'Checkout session created successfully.' })
  createCheckoutSession(
    @Body() checkoutDto: {
      stripeCustomerId: string;
      stripePriceId: string;
      successUrl: string;
      cancelUrl: string;
    },
    @Req() req,
  ) {
    return this.billingService.createCheckoutSession(
      req.user.id,
      checkoutDto.stripeCustomerId,
      checkoutDto.stripePriceId,
      checkoutDto.successUrl,
      checkoutDto.cancelUrl,
    );
  }

  @Post('billing-portal')
  @ApiOperation({ summary: 'Create a billing portal session' })
  @ApiResponse({ status: 201, description: 'Billing portal session created successfully.' })
  createBillingPortalSession(
    @Body() portalDto: { stripeCustomerId: string; returnUrl: string },
  ) {
    return this.billingService.createBillingPortalSession(
      portalDto.stripeCustomerId,
      portalDto.returnUrl,
    );
  }

  @Get('plans')
  @ApiOperation({ summary: 'List available subscription plans' })
  @ApiResponse({ status: 200, description: 'Return available subscription plans.' })
  listPlans() {
    return this.billingService.listSubscriptionPlans();
  }

  @Get('features/:feature')
  @ApiOperation({ summary: 'Check if user has access to a feature' })
  @ApiResponse({ status: 200, description: 'Return whether user has access to the feature.' })
  hasFeatureAccess(@Param('feature') feature: string, @Req() req) {
    return this.billingService.hasFeatureAccess(req.user.id, feature);
  }

  @Post('webhook')
  @ApiOperation({ summary: 'Handle Stripe webhook events' })
  @ApiResponse({ status: 200, description: 'Webhook handled successfully.' })
  async handleWebhook(
    @Body() payload: Buffer,
    @Req() req,
  ) {
    const signature = req.headers['stripe-signature'];
    await this.billingService.handleWebhookEvent(signature, payload);
    return { received: true };
  }
}
