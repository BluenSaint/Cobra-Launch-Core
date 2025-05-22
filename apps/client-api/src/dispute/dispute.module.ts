import { Module } from '@nestjs/common';
import { DisputeService } from './dispute.service';
import { DisputeController } from './dispute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisputeEntity } from './entities/dispute.entity';
import { ViolationEntity } from './entities/violation.entity';
import { DisputeLetterEntity } from './entities/dispute-letter.entity';
import { DisputeTimelineEntity } from './entities/dispute-timeline.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DisputeEntity,
      ViolationEntity,
      DisputeLetterEntity,
      DisputeTimelineEntity,
    ]),
  ],
  controllers: [DisputeController],
  providers: [DisputeService],
  exports: [DisputeService],
})
export class DisputeModule {}
