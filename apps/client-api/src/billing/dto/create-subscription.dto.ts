import { IsNotEmpty, IsString, IsUUID, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty({ description: 'Stripe customer ID' })
  @IsString()
  @IsNotEmpty()
  stripeCustomerId: string;

  @ApiProperty({ description: 'Stripe price ID' })
  @IsString()
  @IsNotEmpty()
  stripePriceId: string;

  @ApiProperty({ 
    description: 'Subscription plan', 
    enum: ['free', 'shield', 'elite', 'infinity'],
    default: 'shield'
  })
  @IsEnum(['free', 'shield', 'elite', 'infinity'])
  @IsNotEmpty()
  plan: string;

  @ApiPropertyOptional({ description: 'Additional metadata', type: 'object' })
  @IsOptional()
  metadata?: Record<string, any>;
}
