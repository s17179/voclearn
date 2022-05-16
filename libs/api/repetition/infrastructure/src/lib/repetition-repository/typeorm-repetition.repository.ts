import { RepetitionRepository } from '@voclearn/api-repetition-application';
import { Injectable } from '@nestjs/common';
import { LearnerId, CardId, Repetition } from '@voclearn/api-repetition-domain';
import { QueryRunner } from 'typeorm';
import { LearnerMapper } from '../learner-repository/learner.mapper';
import { CardMapper } from '../learner-repository/card.mapper';
import { DomainEventPublisher } from '@voclearn/api/shared/infrastructure/domain-event-publisher';
import { TypeormLearnerEntityRepository } from '../learner-repository/typeorm-learner-entity.repository';
import { TypeormCardEntityRepository } from '../learner-repository/typeorm-card-entity.repository';
import { TypeormPartitionEntityRepository } from '../learner-repository/typeorm-partition-entity.repository';

@Injectable()
export class TypeormRepetitionRepository implements RepetitionRepository {
  constructor(
    private readonly learnerMapper: LearnerMapper,
    private readonly cardMapper: CardMapper,
    private readonly domainEventPublisher: DomainEventPublisher,
    private readonly learnerEntityRepository: TypeormLearnerEntityRepository,
    private readonly cardEntityRepository: TypeormCardEntityRepository,
    private readonly partitionEntityRepository: TypeormPartitionEntityRepository
  ) {}

  async get(
    cardId: CardId,
    learnerId: LearnerId,
    transaction: QueryRunner
  ): Promise<Repetition> {
    await this.assertCardIsPartOfPartition(cardId, learnerId, transaction);

    const learnerEntity = await this.learnerEntityRepository.get(
      learnerId,
      transaction
    );
    const cardEntity = await this.cardEntityRepository.get(cardId, transaction);

    const learner = this.learnerMapper.map(learnerEntity);
    const card = this.cardMapper.map(cardEntity);

    return new Repetition(learner, card);
  }

  async save(repetition: Repetition, transaction: QueryRunner): Promise<void> {
    const repetitionSnapshot = repetition.getSnapshot();

    const learner = repetitionSnapshot.learner;
    const card = repetitionSnapshot.card;

    const learnerEntity = this.learnerMapper.mapToEntity(learner);
    const cardEntity = this.cardMapper.mapToEntity(card, learnerEntity);

    await this.learnerEntityRepository.save(learnerEntity, transaction);
    await this.cardEntityRepository.save(cardEntity, transaction);

    await this.domainEventPublisher.publishAll(
      learner.getUncommittedEvents(),
      transaction
    );
  }

  private async assertCardIsPartOfPartition(
    cardId: CardId,
    learnerId: LearnerId,
    transaction: QueryRunner
  ): Promise<void> {
    const isCardPartOfPartition = await this.partitionEntityRepository.has(
      cardId,
      learnerId,
      transaction
    );

    if (!isCardPartOfPartition) {
      throw new Error(
        `Card ${cardId.value} is not a part of the partition of learner ${learnerId}`
      );
    }
  }
}
