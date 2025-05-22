import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProcessDocumentDto {
  @ApiProperty({ description: 'Path to the document file' })
  @IsString()
  @IsNotEmpty()
  documentPath: string;

  @ApiProperty({ 
    description: 'Type of document', 
    enum: ['credit_report', 'dispute_letter', 'correspondence', 'other'],
    default: 'credit_report'
  })
  @IsEnum(['credit_report', 'dispute_letter', 'correspondence', 'other'])
  @IsNotEmpty()
  documentType: string;

  @ApiPropertyOptional({ description: 'Additional processing options', type: 'object' })
  @IsOptional()
  options?: Record<string, any>;
}
