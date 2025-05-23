import { IsNotEmpty, IsString, IsEmail, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CFPBComplaintDto {
  @ApiProperty({ example: 'John', description: 'Consumer first name' })
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Consumer last name' })
  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Consumer email address' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    example: {
      line1: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345'
    },
    description: 'Consumer address'
  })
  @IsNotEmpty({ message: 'Address is required' })
  address: {
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

  @ApiProperty({ example: 'Incorrect information on credit report', description: 'Issue description' })
  @IsString()
  @IsNotEmpty({ message: 'Issue is required' })
  issue: string;

  @ApiProperty({
    example: 'I have disputed this account multiple times but the bureau has failed to investigate properly...',
    description: 'Detailed complaint narrative'
  })
  @IsString()
  @IsNotEmpty({ message: 'Narrative is required' })
  narrative: string;

  @ApiProperty({
    example: ['https://storage.example.com/documents/letter1.pdf'],
    description: 'URLs to supporting documents',
    required: false
  })
  @IsArray()
  @IsOptional()
  attachmentUrls?: string[];
}
