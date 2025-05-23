import { Controller, Post, Body, UseGuards, Get, Param, Query } from '@nestjs/common';
import { DisputeService } from './dispute.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { DisputeDto } from './dto/dispute.dto';
import { ValidateLetterDto } from './dto/validate-letter.dto';

@ApiTags('disputes')
@Controller('disputes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DisputeController {
  constructor(private readonly disputeService: DisputeService) {}

  @Post('launch')
  @ApiOperation({ summary: 'Launch a new dispute campaign' })
  @ApiBody({ type: DisputeDto })
  @ApiResponse({ status: 201, description: 'Dispute campaign launched successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async launchCampaign(@Body() disputeDto: DisputeDto) {
    return this.disputeService.launchCampaign(disputeDto);
  }

  @Post('update-statuses')
  @ApiOperation({ summary: 'Update dispute statuses (admin only)' })
  @ApiResponse({ status: 200, description: 'Status update job initiated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  async updateDisputeStatuses() {
    return this.disputeService.updateDisputeStatuses();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get dispute by ID' })
  @ApiParam({ name: 'id', description: 'Dispute ID' })
  @ApiResponse({ status: 200, description: 'Dispute found' })
  @ApiResponse({ status: 404, description: 'Dispute not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getDisputeById(@Param('id') id: string) {
    return this.disputeService.getDisputeById(id);
  }

  @Post('validate-letter')
  @ApiOperation({ summary: 'Validate dispute letter for FCRA compliance' })
  @ApiBody({ type: ValidateLetterDto })
  @ApiResponse({ status: 200, description: 'Letter validated' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async validateDisputeLetter(@Body() validateLetterDto: ValidateLetterDto) {
    return this.disputeService.validateDisputeLetter(validateLetterDto.text);
  }
}
