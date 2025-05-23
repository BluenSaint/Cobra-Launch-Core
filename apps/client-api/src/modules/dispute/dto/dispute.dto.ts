import { IsNotEmpty, IsArray, IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Bureau } from '../enums/bureau.enum';

export class DisputeDto {
  @ApiProperty({ example: 'user-123', description: 'User ID' })
  @IsString()
  @IsNotEmpty({ message: 'User ID is required' })
  userId: string;

  @ApiProperty({ 
    example: ['EXPERIAN', 'TRANSUNION'], 
    description: 'Credit bureaus to dispute with',
    enum: Bureau,
    isArray: true
  })
  @IsArray()
  @IsEnum(Bureau, { each: true })
  @IsNotEmpty({ message: 'At least one bureau is required' })
  bureaus: Bureau[];

  @ApiProperty({ example: 'report-123', description: 'Credit report ID' })
  @IsString()
  @IsNotEmpty({ message: 'Credit report ID is required' })
  reportId: string;

  @ApiProperty({ 
    example: ['account-123', 'account-456'], 
    description: 'Account IDs to dispute',
    isArray: true
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ message: 'At least one account ID is required' })
  accountIds: string[];

  @ApiProperty({ 
    example: 'This account does not belong to me.', 
    description: 'Dispute reason',
    required: false
  })
  @IsString()
  @IsOptional()
  reason?: string;
}
