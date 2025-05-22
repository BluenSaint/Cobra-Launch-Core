import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from '../user/entities/user.entity';
import { DisputeEntity } from '../dispute/entities/dispute.entity';
import { EscalationEntity } from '../escalation/entities/escalation.entity';
import { OcrResultEntity } from '../ocr/entities/ocr-result.entity';
import { SubscriptionEntity } from '../billing/entities/subscription.entity';
import { AuditLogEntity } from './entities/audit-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      DisputeEntity,
      EscalationEntity,
      OcrResultEntity,
      SubscriptionEntity,
      AuditLogEntity,
    ]),
    ConfigModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
