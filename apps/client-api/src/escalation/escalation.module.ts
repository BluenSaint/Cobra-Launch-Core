import { Module } from '@nestjs/common';
import { EscalationService } from './escalation.service';
import { EscalationController } from './escalation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EscalationEntity } from './entities/escalation.entity';
import { EscalationDocumentEntity } from './entities/escalation-document.entity';
import { EscalationTimelineEntity } from './entities/escalation-timeline.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EscalationEntity,
      EscalationDocumentEntity,
      EscalationTimelineEntity,
    ]),
  ],
  controllers: [EscalationController],
  providers: [EscalationService],
  exports: [EscalationService],
})
export class EscalationModule {}
