import { Injectable } from '@nestjs/common';
import {
  CardId,
  CurrentDeckCard,
  LearnerId,
  LearningSession,
  Partition,
} from '@voclearn/api-repetition-domain';
import { Brackets, DeleteResult, QueryRunner, Repository } from 'typeorm';
import { PartitionEntity } from './partition.entity';
import { TypeormCardEntityRepository } from './typeorm-card-entity.repository';
import { TypeormLearnerEntityRepository } from './typeorm-learner-entity.repository';
import { CardEntity } from './card.entity';

@Injectable()
export class TypeormPartitionEntityRepository {
  constructor(
    private readonly cardEntityRepository: TypeormCardEntityRepository,
    private readonly learnerEntityRepository: TypeormLearnerEntityRepository
  ) {}

  async refill(
    session: LearningSession,
    learnerId: LearnerId,
    transaction: QueryRunner
  ): Promise<Partition> {
    await this.deleteAll(learnerId, transaction);

    const [query, params] = transaction.manager
      .createQueryBuilder(transaction)
      .select('card.id, card.learnerId')
      .from(CardEntity, 'card')
      .where('card.learnerId = :learnerId', { learnerId: learnerId })
      .andWhere(
        new Brackets((qb) => {
          qb.where('card.type = :type', { type: CurrentDeckCard.name });
          qb.orWhere(':sessionNumber = ANY(card.sessionDeckNumbers)', {
            sessionNumber: session.toNumber(),
          });
          qb.orWhere('card.retiredInSession = :sessionNumber', {
            sessionNumber: session.toNumber(),
          });
        })
      )
      .getQueryAndParameters();

    const insertResult = await this.getRepository(transaction).query(
      `INSERT INTO partitions ("cardId", "learnerId") ${query} RETURNING id`,
      params
    );

    return new Partition(insertResult.length);
  }

  async insert(
    cardId: CardId,
    learnerId: LearnerId,
    transaction: QueryRunner
  ): Promise<void> {
    const cardEntity = this.cardEntityRepository.getReference(
      cardId,
      transaction
    );

    const learnerEntity = this.learnerEntityRepository.getReference(
      learnerId,
      transaction
    );

    const partitionEntity = new PartitionEntity(cardEntity, learnerEntity);

    await this.getRepository(transaction).insert(partitionEntity);
  }

  async remove(
    cardId: CardId,
    learnerId: LearnerId,
    transaction: QueryRunner
  ): Promise<DeleteResult> {
    const cardEntity = this.cardEntityRepository.getReference(
      cardId,
      transaction
    );

    const learnerEntity = this.learnerEntityRepository.getReference(
      learnerId,
      transaction
    );

    return this.getRepository(transaction).delete({
      card: cardEntity,
      learner: learnerEntity,
    });
  }

  async has(
    cardId: CardId,
    learnerId: LearnerId,
    transaction: QueryRunner
  ): Promise<boolean> {
    const partitionEntity = await this.getRepository(transaction).findOne({
      where: {
        card: this.cardEntityRepository.getReference(cardId, transaction),
        learner: this.learnerEntityRepository.getReference(
          learnerId,
          transaction
        ),
      },
    });

    return partitionEntity !== undefined;
  }

  async deleteAll(
    learnerId: LearnerId,
    transaction: QueryRunner
  ): Promise<void> {
    const learnerEntity = this.learnerEntityRepository.getReference(
      learnerId,
      transaction
    );

    await this.getRepository(transaction).delete({
      learner: learnerEntity,
    });
  }

  delete(
    cardId: CardId,
    learnerId: LearnerId,
    transaction: QueryRunner
  ): Promise<DeleteResult> {
    return this.getRepository(transaction).delete({
      card: this.cardEntityRepository.getReference(cardId, transaction),
      learner: this.learnerEntityRepository.getReference(
        learnerId,
        transaction
      ),
    });
  }

  private getRepository(transaction: QueryRunner): Repository<PartitionEntity> {
    return transaction.manager.getRepository(PartitionEntity);
  }
}
