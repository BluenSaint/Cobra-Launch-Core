import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';

@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get admin dashboard statistics' })
  @ApiResponse({ status: 200, description: 'Return dashboard statistics.' })
  getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('users')
  @ApiOperation({ summary: 'Get all users with pagination' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filters') filters: string,
  ) {
    const parsedFilters = filters ? JSON.parse(filters) : {};
    return this.adminService.getAllUsers(page, limit, parsedFilters);
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'Return the user.' })
  getUserById(@Param('id') id: string) {
    return this.adminService.getUserById(id);
  }

  @Patch('users/:id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  updateUser(
    @Param('id') id: string,
    @Body() userData: any,
  ) {
    return this.adminService.updateUser(id, userData);
  }

  @Get('disputes')
  @ApiOperation({ summary: 'Get all disputes with pagination' })
  @ApiResponse({ status: 200, description: 'Return all disputes.' })
  getAllDisputes(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filters') filters: string,
  ) {
    const parsedFilters = filters ? JSON.parse(filters) : {};
    return this.adminService.getAllDisputes(page, limit, parsedFilters);
  }

  @Get('disputes/:id')
  @ApiOperation({ summary: 'Get dispute by ID' })
  @ApiResponse({ status: 200, description: 'Return the dispute.' })
  getDisputeById(@Param('id') id: string) {
    return this.adminService.getDisputeById(id);
  }

  @Patch('disputes/:id')
  @ApiOperation({ summary: 'Update dispute' })
  @ApiResponse({ status: 200, description: 'Dispute updated successfully.' })
  updateDispute(
    @Param('id') id: string,
    @Body() disputeData: any,
    @Req() req,
  ) {
    return this.adminService.updateDispute(id, disputeData, req.user.id);
  }

  @Get('escalations')
  @ApiOperation({ summary: 'Get all escalations with pagination' })
  @ApiResponse({ status: 200, description: 'Return all escalations.' })
  getAllEscalations(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filters') filters: string,
  ) {
    const parsedFilters = filters ? JSON.parse(filters) : {};
    return this.adminService.getAllEscalations(page, limit, parsedFilters);
  }

  @Get('escalations/:id')
  @ApiOperation({ summary: 'Get escalation by ID' })
  @ApiResponse({ status: 200, description: 'Return the escalation.' })
  getEscalationById(@Param('id') id: string) {
    return this.adminService.getEscalationById(id);
  }

  @Patch('escalations/:id')
  @ApiOperation({ summary: 'Update escalation' })
  @ApiResponse({ status: 200, description: 'Escalation updated successfully.' })
  updateEscalation(
    @Param('id') id: string,
    @Body() escalationData: any,
    @Req() req,
  ) {
    return this.adminService.updateEscalation(id, escalationData, req.user.id);
  }

  @Get('subscriptions')
  @ApiOperation({ summary: 'Get all subscriptions with pagination' })
  @ApiResponse({ status: 200, description: 'Return all subscriptions.' })
  getAllSubscriptions(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filters') filters: string,
  ) {
    const parsedFilters = filters ? JSON.parse(filters) : {};
    return this.adminService.getAllSubscriptions(page, limit, parsedFilters);
  }

  @Get('subscriptions/:id')
  @ApiOperation({ summary: 'Get subscription by ID' })
  @ApiResponse({ status: 200, description: 'Return the subscription.' })
  getSubscriptionById(@Param('id') id: string) {
    return this.adminService.getSubscriptionById(id);
  }

  @Patch('subscriptions/:id')
  @ApiOperation({ summary: 'Update subscription' })
  @ApiResponse({ status: 200, description: 'Subscription updated successfully.' })
  updateSubscription(
    @Param('id') id: string,
    @Body() subscriptionData: any,
    @Req() req,
  ) {
    return this.adminService.updateSubscription(id, subscriptionData, req.user.id);
  }

  @Get('ocr-results')
  @ApiOperation({ summary: 'Get all OCR results with pagination' })
  @ApiResponse({ status: 200, description: 'Return all OCR results.' })
  getAllOcrResults(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filters') filters: string,
  ) {
    const parsedFilters = filters ? JSON.parse(filters) : {};
    return this.adminService.getAllOcrResults(page, limit, parsedFilters);
  }

  @Get('ocr-results/:id')
  @ApiOperation({ summary: 'Get OCR result by ID' })
  @ApiResponse({ status: 200, description: 'Return the OCR result.' })
  getOcrResultById(@Param('id') id: string) {
    return this.adminService.getOcrResultById(id);
  }

  @Get('audit-logs')
  @ApiOperation({ summary: 'Get all audit logs with pagination' })
  @ApiResponse({ status: 200, description: 'Return all audit logs.' })
  getAllAuditLogs(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filters') filters: string,
  ) {
    const parsedFilters = filters ? JSON.parse(filters) : {};
    return this.adminService.getAllAuditLogs(page, limit, parsedFilters);
  }

  @Post('audit-logs')
  @ApiOperation({ summary: 'Create audit log' })
  @ApiResponse({ status: 201, description: 'Audit log created successfully.' })
  createAuditLog(
    @Body() createAuditLogDto: CreateAuditLogDto,
  ) {
    return this.adminService.createAuditLog(createAuditLogDto);
  }

  @Get('system-health')
  @ApiOperation({ summary: 'Get system health status' })
  @ApiResponse({ status: 200, description: 'Return system health status.' })
  getSystemHealth() {
    return this.adminService.getSystemHealth();
  }
}
