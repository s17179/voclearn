import { Injectable } from '@nestjs/common';
import { QueryRunner, Repository } from 'typeorm';
import {
  CardId,
  CurrentDeckCard,
  LearnerId,
} from '@voclearn/api-repetition-domain';
import { CardEntity } from './card.entity';
import { TypeormLearnerEntityRepository } from './typeorm-learner-entity.repository';

@Injectable()
export class TypeormCardEntityRepository {
  constructor(
    private readonly learnerEntityRepository: TypeormLearnerEntityRepository
  ) {}

  get(cardId: CardId, transaction: QueryRunner): Promise<CardEntity> {
    return this.getRepository(transaction).findOneOrFail(cardId.value);
  }

  async save(entity: CardEntity, transaction: QueryRunner): Promise<void> {
    await this.getRepository(transaction).save(entity);
  }

  async has(cardId: CardId, transaction: QueryRunner): Promise<boolean> {
    const cardEntity = await this.getRepository(transaction).findOne(
      cardId.value
    );

    return cardEntity !== undefined;
  }

  async delete(cardId: CardId, transaction: QueryRunner): Promise<void> {
    await this.getRepository(transaction).delete(cardId.value);
  }

  async updateAllToCurrentDeckCards(
    learnerId: LearnerId,
    transaction: QueryRunner
  ): Promise<void> {
    const learnerEntity = this.learnerEntityRepository.getReference(
      learnerId,
      transaction
    );

    await this.getRepository(transaction).update(
      { learner: learnerEntity },
      {
        type: CurrentDeckCard.name,
        sessionDeckNumbers: null,
        retiredInSession: null,
      }
    );
  }

  // remove(
  //   cardId: CardId,
  //   learnerId: LearnerId,
  //   transaction: QueryRunner
  // ): Promise<void> {
  //   const deleteResult = await this.partitionRepository(transaction).delete({
  //     card: this.getReference(cardId, transaction),
  //   });
  //
  //   const cardWasPartOfPartition =
  //     deleteResult.affected !== undefined &&
  //     deleteResult.affected !== null &&
  //     deleteResult.affected > 0;
  //
  //   if (cardWasPartOfPartition) {
  //   }
  // }

  getReference(cardId: CardId, transaction: QueryRunner): CardEntity {
    return this.getRepository(transaction).create({ id: cardId.value });
  }

  private getRepository(transaction: QueryRunner): Repository<CardEntity> {
    return transaction.manager.getRepository(CardEntity);
  }
}
