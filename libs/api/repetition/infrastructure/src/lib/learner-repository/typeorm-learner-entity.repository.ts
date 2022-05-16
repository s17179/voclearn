import { Injectable } from '@nestjs/common';
import { LearnerEntity } from './learner.entity';
import { LearnerId } from '@voclearn/api-repetition-domain';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class TypeormLearnerEntityRepository {
  get(learnerId: LearnerId, transaction: QueryRunner): Promise<LearnerEntity> {
    return this.getRepository(transaction).findOneOrFail(learnerId);
  }

  async save(entity: LearnerEntity, transaction: QueryRunner): Promise<void> {
    await this.getRepository(transaction).save(entity);
  }

  async update(
    learnerId: LearnerId,
    currentSession: number,
    partitionSize: number,
    transaction: QueryRunner
  ): Promise<void> {
    const learnerEntity = this.getReference(learnerId, transaction);

    learnerEntity.currentSession = currentSession;
    learnerEntity.partitionSize = partitionSize;

    await this.getRepository(transaction).save(learnerEntity);
  }

  getReference(learnerId: LearnerId, transaction: QueryRunner): LearnerEntity {
    return this.getRepository(transaction).create({ id: learnerId });
  }

  private getRepository(transaction: QueryRunner): Repository<LearnerEntity> {
    return transaction.manager.getRepository(LearnerEntity);
  }
}
