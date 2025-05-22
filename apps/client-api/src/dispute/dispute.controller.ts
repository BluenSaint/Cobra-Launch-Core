import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { DisputeService } from './dispute.service';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeDto } from './dto/update-dispute.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('disputes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('disputes')
export class DisputeController {
  constructor(private readonly disputeService: DisputeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new dispute' })
  @ApiResponse({ status: 201, description: 'The dispute has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createDisputeDto: CreateDisputeDto, @Req() req) {
    // Add user ID from JWT token
    createDisputeDto.userId = req.user.id;
    return this.disputeService.create(createDisputeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all disputes for the current user' })
  @ApiResponse({ status: 200, description: 'Return all disputes for the user.' })
  findAll(
    @Req() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.disputeService.findByUserId(req.user.id, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a dispute by ID' })
  @ApiResponse({ status: 200, description: 'Return the dispute.' })
  @ApiResponse({ status: 404, description: 'Dispute not found.' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.disputeService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a dispute' })
  @ApiResponse({ status: 200, description: 'The dispute has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Dispute not found.' })
  update(
    @Param('id') id: string,
    @Body() updateDisputeDto: UpdateDisputeDto,
    @Req() req,
  ) {
    return this.disputeService.update(id, updateDisputeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a dispute' })
  @ApiResponse({ status: 200, description: 'The dispute has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Dispute not found.' })
  remove(@Param('id') id: string, @Req() req) {
    return this.disputeService.remove(id);
  }

  @Post(':id/violations')
  @ApiOperation({ summary: 'Add violations to a dispute' })
  @ApiResponse({ status: 201, description: 'Violations have been successfully added.' })
  @ApiResponse({ status: 404, description: 'Dispute not found.' })
  addViolations(
    @Param('id') id: string,
    @Body() violations: any[],
    @Req() req,
  ) {
    return this.disputeService.addViolations(id, violations);
  }

  @Post(':id/generate-letter')
  @ApiOperation({ summary: 'Generate a dispute letter' })
  @ApiResponse({ status: 201, description: 'Letter has been successfully generated.' })
  @ApiResponse({ status: 404, description: 'Dispute not found.' })
  generateLetter(
    @Param('id') id: string,
    @Body('templateId') templateId: string,
    @Req() req,
  ) {
    return this.disputeService.generateLetter(id, templateId);
  }

  @Post(':id/submit')
  @ApiOperation({ summary: 'Submit a dispute to credit bureau' })
  @ApiResponse({ status: 200, description: 'Dispute has been successfully submitted.' })
  @ApiResponse({ status: 404, description: 'Dispute not found.' })
  submitDispute(
    @Param('id') id: string,
    @Body('bureauId') bureauId: string,
    @Req() req,
  ) {
    return this.disputeService.submitDispute(id, bureauId);
  }

  @Post(':id/escalate')
  @ApiOperation({ summary: 'Escalate a dispute to CFPB or State AG' })
  @ApiResponse({ status: 200, description: 'Dispute has been successfully escalated.' })
  @ApiResponse({ status: 404, description: 'Dispute not found.' })
  escalateDispute(
    @Param('id') id: string,
    @Body() escalationData: { type: 'CFPB' | 'STATE_AG'; details: any },
    @Req() req,
  ) {
    return this.disputeService.escalateDispute(
      id,
      escalationData.type,
      escalationData.details,
    );
  }

  @Get(':id/timeline')
  @ApiOperation({ summary: 'Get dispute timeline' })
  @ApiResponse({ status: 200, description: 'Return the dispute timeline.' })
  @ApiResponse({ status: 404, description: 'Dispute not found.' })
  getTimeline(@Param('id') id: string, @Req() req) {
    return this.disputeService.getTimeline(id);
  }

  @Get('statistics/user')
  @ApiOperation({ summary: 'Get dispute statistics for current user' })
  @ApiResponse({ status: 200, description: 'Return dispute statistics.' })
  getUserStatistics(@Req() req) {
    return this.disputeService.getStatistics(req.user.id);
  }
}
