import { LearnerRepository } from '@voclearn/api-repetition-application';
import { Injectable } from '@nestjs/common';
import {
  CardId,
  Learner,
  LearnerId,
  LearningSession,
  Partition,
} from '@voclearn/api-repetition-domain';
import { DeleteResult, QueryRunner } from 'typeorm';
import { LearnerMapper } from './learner.mapper';
import { CardMapper } from './card.mapper';
import { DomainEventPublisher } from '@voclearn/api/shared/infrastructure/domain-event-publisher';
import { TypeormCardEntityRepository } from './typeorm-card-entity.repository';
import { TypeormPartitionEntityRepository } from './typeorm-partition-entity.repository';
import { TypeormLearnerEntityRepository } from './typeorm-learner-entity.repository';

@Injectable()
export class TypeormLearnerRepository implements LearnerRepository {
  constructor(
    private readonly learnerMapper: LearnerMapper,
    private readonly cardMapper: CardMapper,
    private readonly domainEventPublisher: DomainEventPublisher,
    private readonly learnerEntityRepository: TypeormLearnerEntityRepository,
    private readonly cardEntityRepository: TypeormCardEntityRepository,
    private readonly partitionEntityRepository: TypeormPartitionEntityRepository
  ) {}

  async get(learnerId: LearnerId, transaction: QueryRunner): Promise<Learner> {
    try {
      const learnerEntity = await this.learnerEntityRepository.get(
        learnerId,
        transaction
      );

      return this.learnerMapper.map(learnerEntity);
    } catch (e) {
      return new Learner(learnerId, LearningSession.start(), Partition.empty());
    }
  }

  async save(learner: Learner, transaction: QueryRunner): Promise<void> {
    const learnerEntity = this.learnerMapper.mapToEntity(learner);

    await this.learnerEntityRepository.save(learnerEntity, transaction);

    await this.domainEventPublisher.publishAll(
      learner.getUncommittedEvents(),
      transaction
    );
  }

  async reset(learnerId: LearnerId, transaction: QueryRunner): Promise<void> {
    await this.cardEntityRepository.updateAllToCurrentDeckCards(
      learnerId,
      transaction
    );

    const partition = await this.partitionEntityRepository.refill(
      LearningSession.start(),
      learnerId,
      transaction
    );

    await this.learnerEntityRepository.update(
      learnerId,
      LearningSession.start().toNumber(),
      partition.getSize(),
      transaction
    );
  }

  async addCardToPartition(
    cardId: CardId,
    learnerId: LearnerId,
    transaction: QueryRunner
  ): Promise<void> {
    await this.partitionEntityRepository.insert(cardId, learnerId, transaction);
  }

  fillPartition(
    session: LearningSession,
    learnerId: LearnerId,
    transaction: QueryRunner
  ): Promise<Partition> {
    return this.partitionEntityRepository.refill(
      session,
      learnerId,
      transaction
    );
  }

  hasCard(cardId: CardId, transaction: QueryRunner): Promise<boolean> {
    return this.cardEntityRepository.has(cardId, transaction);
  }

  async removeCardFromPartition(
    cardId: CardId,
    learnerId: LearnerId,
    transaction: QueryRunner
  ): Promise<boolean> {
    const result = await this.partitionEntityRepository.remove(
      cardId,
      learnerId,
      transaction
    );

    return !!result.affected;
  }

  async removeCard(cardId: CardId, transaction: QueryRunner): Promise<void> {
    await this.cardEntityRepository.delete(cardId, transaction);
  }
}
