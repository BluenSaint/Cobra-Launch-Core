import { Controller, Post, Body, UseGuards, Param } from '@nestjs/common';
import { EscalationService } from './escalation.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CFPBComplaintDto } from './dto/cfpb-complaint.dto';
import { CertifiedMailDto } from './dto/certified-mail.dto';
import { AGComplaintDto } from './dto/ag-complaint.dto';

@ApiTags('escalation')
@Controller('escalation')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class EscalationController {
  constructor(private readonly escalationService: EscalationService) {}

  @Post('cfpb/:disputeId')
  @ApiOperation({ summary: 'Trigger CFPB complaint' })
  @ApiParam({ name: 'disputeId', description: 'Dispute ID to escalate' })
  @ApiBody({ type: CFPBComplaintDto })
  @ApiResponse({ status: 201, description: 'CFPB complaint process initiated' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async triggerCFPBComplaint(
    @Param('disputeId') disputeId: string,
    @Body() cfpbComplaintDto: CFPBComplaintDto,
  ) {
    return this.escalationService.triggerCFPBComplaint({
      ...cfpbComplaintDto,
      disputeId,
    });
  }

  @Post('certified-mail/:disputeId')
  @ApiOperation({ summary: 'Send certified mail via Lob.com' })
  @ApiParam({ name: 'disputeId', description: 'Dispute ID to escalate' })
  @ApiBody({ type: CertifiedMailDto })
  @ApiResponse({ status: 201, description: 'Certified mail scheduled for delivery' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async sendCertifiedMail(
    @Param('disputeId') disputeId: string,
    @Body() certifiedMailDto: CertifiedMailDto,
  ) {
    return this.escalationService.sendCertifiedMail({
      ...certifiedMailDto,
      disputeId,
    });
  }

  @Post('attorney-general/:disputeId')
  @ApiOperation({ summary: 'Trigger Attorney General complaint' })
  @ApiParam({ name: 'disputeId', description: 'Dispute ID to escalate' })
  @ApiBody({ type: AGComplaintDto })
  @ApiResponse({ status: 201, description: 'Attorney General complaint process initiated' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async triggerAttorneyGeneralComplaint(
    @Param('disputeId') disputeId: string,
    @Body() agComplaintDto: AGComplaintDto,
  ) {
    return this.escalationService.triggerAttorneyGeneralComplaint({
      ...agComplaintDto,
      disputeId,
    });
  }
}
