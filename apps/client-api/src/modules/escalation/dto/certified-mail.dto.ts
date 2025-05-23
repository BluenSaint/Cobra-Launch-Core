import { IsNotEmpty, IsString, IsObject, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CertifiedMailDto {
  @ApiProperty({ example: 'John', description: 'Sender first name' })
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Sender last name' })
  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @ApiProperty({
    example: {
      line1: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345'
    },
    description: 'Sender address'
  })
  @IsObject()
  @IsNotEmpty({ message: 'From address is required' })
  fromAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
  };

  @ApiProperty({ example: 'EXPERIAN', description: 'Credit bureau name' })
  @IsString()
  @IsNotEmpty({ message: 'Bureau is required' })
  bureau: string;

  @ApiProperty({
    example: {
      line1: '475 Anton Blvd',
      city: 'Costa Mesa',
      state: 'CA',
      zip: '92626'
    },
    description: 'Bureau address'
  })
  @IsObject()
  @IsNotEmpty({ message: 'Bureau address is required' })
  bureauAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
  };

  @ApiProperty({
    example: 'https://storage.example.com/letters/dispute_letter.pdf',
    description: 'URL to the letter PDF file'
  })
  @IsString()
  @IsNotEmpty({ message: 'Letter file URL is required' })
  letterFileUrl: string;

  @ApiProperty({
    example: 'Additional tracking information',
    description: 'Optional tracking information',
    required: false
  })
  @IsString()
  @IsOptional()
  trackingInfo?: string;
}
