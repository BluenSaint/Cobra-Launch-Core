import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('disputes')
export class DisputesController {
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createDispute(@Request() req) {
    return { success: true, message: 'Dispute created' };
  }

  @Post('upload/report')
  uploadReport(@Request() req) {
    console.log('File metadata:', req.body);
    console.log('User info:', req.user);
    return { success: true, message: 'Report uploaded' };
  }
} 