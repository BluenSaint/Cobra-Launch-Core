import { Controller, Get, Post, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { OcrService } from './ocr.service';
import { ProcessDocumentDto } from './dto/process-document.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('ocr')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ocr')
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @Post('process')
  @ApiOperation({ summary: 'Process a document with OCR' })
  @ApiResponse({ status: 201, description: 'Document processing initiated.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  processDocument(
    @Body() processDocumentDto: ProcessDocumentDto,
    @Req() req,
  ) {
    return this.ocrService.processDocument(req.user.id, processDocumentDto);
  }

  @Get('results')
  @ApiOperation({ summary: 'Get OCR results for the current user' })
  @ApiResponse({ status: 200, description: 'Return OCR results for the user.' })
  getResults(
    @Req() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.ocrService.getResultsByUserId(req.user.id, page, limit);
  }

  @Get('results/:id')
  @ApiOperation({ summary: 'Get OCR result by ID' })
  @ApiResponse({ status: 200, description: 'Return the OCR result.' })
  @ApiResponse({ status: 404, description: 'OCR result not found.' })
  getResultById(@Param('id') id: string) {
    return this.ocrService.getResultById(id);
  }

  @Get('results/:id/violations')
  @ApiOperation({ summary: 'Get violations for an OCR result' })
  @ApiResponse({ status: 200, description: 'Return violations for the OCR result.' })
  @ApiResponse({ status: 404, description: 'OCR result not found.' })
  getViolations(@Param('id') id: string) {
    return this.ocrService.getViolationsByResultId(id);
  }
}
