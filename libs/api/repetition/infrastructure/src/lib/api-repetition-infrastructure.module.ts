import { Module } from '@nestjs/common';
import { ApiSharedInfrastructureDatabaseModule } from '@voclearn/api/shared/infrastructure/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearnerEntity } from './learner-repository/learner.entity';
import { CardEntity } from './learner-repository/card.entity';
import { LearnerMapper } from './learner-repository/learner.mapper';
import { CardMapper } from './learner-repository/card.mapper';
import { PartitionEntity } from './learner-repository/partition.entity';
import { ApiSharedInfrastructureTransactionalModule } from '@voclearn/api/shared/infrastructure/transactional';
import { ApiSharedInfrastructureDomainEventPublisherModule } from '@voclearn/api/shared/infrastructure/domain-event-publisher';
import {
  GetCardToRepeatDataProvider,
  LearnerRepository,
  RepetitionRepository,
} from '@voclearn/api-repetition-application';
import { TypeormLearnerRepository } from './learner-repository/typeorm-learner.repository';
import { TypeormGetCardToRepeatDataProvider } from './get-card-to-repeat-data-provider/typeorm-get-card-to-repeat.data-provider';
import { TypeormCardEntityRepository } from './learner-repository/typeorm-card-entity.repository';
import { TypeormPartitionEntityRepository } from './learner-repository/typeorm-partition-entity.repository';
import { TypeormLearnerEntityRepository } from './learner-repository/typeorm-learner-entity.repository';
import { TypeormRepetitionRepository } from './repetition-repository/typeorm-repetition.repository';

@Module({
  imports: [
    ApiSharedInfrastructureDatabaseModule,
    TypeOrmModule.forFeature([LearnerEntity, CardEntity, PartitionEntity]),
    ApiSharedInfrastructureTransactionalModule,
    ApiSharedInfrastructureDomainEventPublisherModule,
  ],
  providers: [
    {
      provide: LearnerRepository,
      useClass: TypeormLearnerRepository,
    },
    {
      provide: RepetitionRepository,
      useClass: TypeormRepetitionRepository,
    },
    {
      provide: GetCardToRepeatDataProvider,
      useClass: TypeormGetCardToRepeatDataProvider,
    },
    LearnerMapper,
    CardMapper,
    TypeormCardEntityRepository,
    TypeormPartitionEntityRepository,
    TypeormLearnerEntityRepository,
  ],
  exports: [
    LearnerRepository,
    RepetitionRepository,
    GetCardToRepeatDataProvider,
    ApiSharedInfrastructureTransactionalModule,
    ApiSharedInfrastructureDomainEventPublisherModule,
  ],
})
export class ApiRepetitionInfrastructureModule {}
