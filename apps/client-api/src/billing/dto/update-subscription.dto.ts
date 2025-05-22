import { PartialType } from '@nestjs/swagger';
import { CreateSubscriptionDto } from './create-subscription.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {
  @IsBoolean()
  @IsOptional()
  cancelAtPeriodEnd?: boolean;
}
