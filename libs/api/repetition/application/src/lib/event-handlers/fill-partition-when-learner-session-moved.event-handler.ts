import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LearnerSessionMovedEvent } from '@voclearn/api-repetition-domain';
import { Transaction } from '@voclearn/api/shared/application';
import { LearnerRepository } from '../gateways/learner.repository';

@Injectable()
export class FillPartitionWhenLearnerSessionMovedEventHandler {
  private readonly logger = new Logger(
    FillPartitionWhenLearnerSessionMovedEventHandler.name
  );

  constructor(private readonly learnerRepository: LearnerRepository) {}

  @OnEvent(LearnerSessionMovedEvent.name)
  async handle(
    event: LearnerSessionMovedEvent,
    transaction: Transaction
  ): Promise<void> {
    const learner = await this.learnerRepository.get(
      event.learnerId,
      transaction
    );

    const partition = await this.learnerRepository.fillPartition(
      event.session,
      event.learnerId,
      transaction
    );

    learner.updatePartition(partition);

    await this.learnerRepository.save(learner, transaction);

    this.logger.debug(
      `Partition filled after learner ${
        event.learnerId
      } session moved to ${event.session.toNumber()}`
    );
  }
}
