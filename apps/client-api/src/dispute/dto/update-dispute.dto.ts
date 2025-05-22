import { PartialType } from '@nestjs/swagger';
import { CreateDisputeDto } from './create-dispute.dto';
import { IsEnum, IsOptional, IsDate } from 'class-validator';

export class UpdateDisputeDto extends PartialType(CreateDisputeDto) {
  @IsEnum(['pending', 'in_progress', 'submitted', 'escalated', 'successful', 'failed', 'closed'])
  @IsOptional()
  status?: string;

  @IsDate()
  @IsOptional()
  submittedAt?: Date;

  @IsDate()
  @IsOptional()
  escalatedAt?: Date;

  @IsDate()
  @IsOptional()
  resolvedAt?: Date;
}
