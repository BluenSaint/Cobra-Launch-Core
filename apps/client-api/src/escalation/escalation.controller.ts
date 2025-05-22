import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { EscalationService } from './escalation.service';
import { CreateEscalationDto } from './dto/create-escalation.dto';
import { UpdateEscalationDto } from './dto/update-escalation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('escalations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('escalations')
export class EscalationController {
  constructor(private readonly escalationService: EscalationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new escalation' })
  @ApiResponse({ status: 201, description: 'The escalation has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createEscalationDto: CreateEscalationDto, @Req() req) {
    // Add user ID from JWT token
    createEscalationDto.userId = req.user.id;
    return this.escalationService.create(createEscalationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all escalations for the current user' })
  @ApiResponse({ status: 200, description: 'Return all escalations for the user.' })
  findAll(
    @Req() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.escalationService.findByUserId(req.user.id, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an escalation by ID' })
  @ApiResponse({ status: 200, description: 'Return the escalation.' })
  @ApiResponse({ status: 404, description: 'Escalation not found.' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.escalationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an escalation' })
  @ApiResponse({ status: 200, description: 'The escalation has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Escalation not found.' })
  update(
    @Param('id') id: string,
    @Body() updateEscalationDto: UpdateEscalationDto,
    @Req() req,
  ) {
    return this.escalationService.update(id, updateEscalationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an escalation' })
  @ApiResponse({ status: 200, description: 'The escalation has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Escalation not found.' })
  remove(@Param('id') id: string, @Req() req) {
    return this.escalationService.remove(id);
  }

  @Post(':id/documents')
  @ApiOperation({ summary: 'Add document to an escalation' })
  @ApiResponse({ status: 201, description: 'Document has been successfully added.' })
  @ApiResponse({ status: 404, description: 'Escalation not found.' })
  addDocument(
    @Param('id') id: string,
    @Body() documentData: any,
    @Req() req,
  ) {
    return this.escalationService.addDocument(id, documentData);
  }

  @Post(':id/submit-cfpb')
  @ApiOperation({ summary: 'Submit escalation to CFPB' })
  @ApiResponse({ status: 200, description: 'Escalation has been successfully submitted to CFPB.' })
  @ApiResponse({ status: 404, description: 'Escalation not found.' })
  submitToCFPB(
    @Param('id') id: string,
    @Body() cfpbData: any,
    @Req() req,
  ) {
    return this.escalationService.submitToCFPB(id, cfpbData);
  }

  @Post(':id/submit-state-ag')
  @ApiOperation({ summary: 'Submit escalation to State Attorney General' })
  @ApiResponse({ status: 200, description: 'Escalation has been successfully submitted to State AG.' })
  @ApiResponse({ status: 404, description: 'Escalation not found.' })
  submitToStateAG(
    @Param('id') id: string,
    @Body() stateAgData: any,
    @Req() req,
  ) {
    return this.escalationService.submitToStateAG(id, stateAgData);
  }

  @Get(':id/timeline')
  @ApiOperation({ summary: 'Get escalation timeline' })
  @ApiResponse({ status: 200, description: 'Return the escalation timeline.' })
  @ApiResponse({ status: 404, description: 'Escalation not found.' })
  getTimeline(@Param('id') id: string, @Req() req) {
    return this.escalationService.getTimeline(id);
  }

  @Get('statistics/user')
  @ApiOperation({ summary: 'Get escalation statistics for current user' })
  @ApiResponse({ status: 200, description: 'Return escalation statistics.' })
  getUserStatistics(@Req() req) {
    return this.escalationService.getStatistics(req.user.id);
  }
}
