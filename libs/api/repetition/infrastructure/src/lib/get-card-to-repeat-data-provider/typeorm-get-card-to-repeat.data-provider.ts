import {
  GetCardToRepeatDataProvider,
  GetCardToRepeatQuery,
} from '@voclearn/api-repetition-application';
import { Injectable } from '@nestjs/common';
import { CardId } from '@voclearn/api-repetition-domain';
import { Repository } from 'typeorm';
import { PartitionEntity } from '../learner-repository/partition.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LearnerEntity } from '../learner-repository/learner.entity';
import { Uuid } from '@voclearn/api/shared/domain';

@Injectable()
export class TypeormGetCardToRepeatDataProvider
  implements GetCardToRepeatDataProvider
{
  constructor(
    @InjectRepository(PartitionEntity)
    private readonly partitionRepository: Repository<PartitionEntity>,
    @InjectRepository(LearnerEntity)
    private readonly learnerRepository: Repository<LearnerEntity>
  ) {}

  async provide(query: GetCardToRepeatQuery): Promise<CardId> {
    const learnerEntity = this.learnerRepository.create({
      id: query.learnerId,
    });

    const partitionEntity = await this.partitionRepository.findOne({
      loadRelationIds: {
        relations: ['card'],
      },
      where: {
        learner: learnerEntity,
      },
    });

    if (partitionEntity === undefined) {
      throw new Error(
        `There are no cards in the partition of learner ${query.learnerId}`
      );
    }

    return new Uuid(<string>(<unknown>partitionEntity.card));
  }
}
