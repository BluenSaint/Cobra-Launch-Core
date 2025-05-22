import { Module } from '@nestjs/common';
import { OcrService } from './ocr.service';
import { OcrController } from './ocr.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OcrResultEntity } from './entities/ocr-result.entity';
import { OcrViolationEntity } from './entities/ocr-violation.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OcrResultEntity,
      OcrViolationEntity,
    ]),
    ConfigModule,
  ],
  controllers: [OcrController],
  providers: [OcrService],
  exports: [OcrService],
})
export class OcrModule {}
