import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, Body, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OcrService } from './ocr.service';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('ocr')
@Controller('ocr')
@UseGuards(ThrottlerGuard)
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @Post('process-report')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Process credit report through OCR' })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Credit report file (PDF, JPG, PNG)',
        },
        reportType: {
          type: 'string',
          enum: ['experian', 'transunion', 'equifax', 'other'],
          description: 'Type of credit report',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Report processed successfully' })
  @ApiResponse({ status: 400, description: 'Invalid file or parameters' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Processing error' })
  async analyzeDocument(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { reportType?: string },
  ) {
    if (!file) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }

    // Validate file type
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new HttpException(
        'Invalid file type. Only JPEG, PNG, and PDF are supported.',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const result = await this.ocrService.analyze(file, body.reportType);
      return result;
    } catch (error) {
      throw new HttpException(
        'Error processing document: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
