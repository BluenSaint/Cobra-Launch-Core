import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateLetterDto {
  @ApiProperty({ 
    example: 'To whom it may concern, I am writing to dispute the following item on my credit report...', 
    description: 'Dispute letter text to validate'
  })
  @IsString()
  @IsNotEmpty({ message: 'Letter text is required' })
  text: string;
}
