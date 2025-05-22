import { IsNotEmpty, IsString, IsUUID, IsOptional, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDisputeDto {
  @ApiProperty({ description: 'User ID', required: false })
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ApiProperty({ description: 'Report ID', required: false })
  @IsUUID()
  @IsOptional()
  reportId?: string;

  @ApiProperty({ description: 'Dispute title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Dispute description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Additional metadata', type: 'object' })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}
