import { PartialType } from '@nestjs/swagger';
import { CreateEscalationDto } from './create-escalation.dto';
import { IsEnum, IsOptional, IsDate } from 'class-validator';

export class UpdateEscalationDto extends PartialType(CreateEscalationDto) {
  @IsEnum(['pending', 'in_progress', 'submitted_cfpb', 'submitted_state_ag', 'resolved', 'closed'])
  @IsOptional()
  status?: string;

  @IsDate()
  @IsOptional()
  cfpbSubmissionDate?: Date;

  @IsDate()
  @IsOptional()
  stateAgSubmissionDate?: Date;

  @IsDate()
  @IsOptional()
  resolvedAt?: Date;
}
