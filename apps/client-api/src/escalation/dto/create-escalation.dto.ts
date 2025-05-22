import { IsNotEmpty, IsString, IsUUID, IsOptional, IsObject, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEscalationDto {
  @ApiProperty({ description: 'User ID', required: false })
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ApiProperty({ description: 'Dispute ID', required: false })
  @IsUUID()
  @IsOptional()
  disputeId?: string;

  @ApiProperty({ description: 'Escalation title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Escalation description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Escalation type', enum: ['CFPB', 'STATE_AG', 'CREDIT_BUREAU', 'OTHER'] })
  @IsEnum(['CFPB', 'STATE_AG', 'CREDIT_BUREAU', 'OTHER'])
  @IsNotEmpty()
  type: string;

  @ApiPropertyOptional({ description: 'Additional metadata', type: 'object' })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}
