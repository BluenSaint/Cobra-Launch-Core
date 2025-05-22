import { IsNotEmpty, IsString, IsUUID, IsOptional, IsEnum, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAuditLogDto {
  @ApiProperty({ description: 'User ID' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ 
    description: 'Action type', 
    enum: ['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'ERROR', 'UPDATE_DISPUTE', 'UPDATE_ESCALATION', 'UPDATE_SUBSCRIPTION', 'ADMIN_ACTION', 'OTHER'],
  })
  @IsEnum(['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'ERROR', 'UPDATE_DISPUTE', 'UPDATE_ESCALATION', 'UPDATE_SUBSCRIPTION', 'ADMIN_ACTION', 'OTHER'])
  @IsNotEmpty()
  action: string;

  @ApiPropertyOptional({ description: 'Entity ID' })
  @IsString()
  @IsOptional()
  entityId?: string;

  @ApiPropertyOptional({ 
    description: 'Entity type',
    enum: ['USER', 'DISPUTE', 'ESCALATION', 'OCR', 'SUBSCRIPTION', 'PAYMENT', 'SYSTEM', 'OTHER'],
  })
  @IsEnum(['USER', 'DISPUTE', 'ESCALATION', 'OCR', 'SUBSCRIPTION', 'PAYMENT', 'SYSTEM', 'OTHER'])
  @IsOptional()
  entityType?: string;

  @ApiPropertyOptional({ description: 'Details' })
  @IsString()
  @IsOptional()
  details?: string;

  @ApiPropertyOptional({ description: 'Additional metadata', type: 'object' })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;

  @ApiPropertyOptional({ description: 'IP address' })
  @IsString()
  @IsOptional()
  ipAddress?: string;

  @ApiPropertyOptional({ description: 'User agent' })
  @IsString()
  @IsOptional()
  userAgent?: string;
}
