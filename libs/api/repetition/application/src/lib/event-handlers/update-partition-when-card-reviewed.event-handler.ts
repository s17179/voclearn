import { Injectable, Logger } from '@nestjs/common';
import { LearnerRepository } from '../gateways/learner.repository';
import { OnEvent } from '@nestjs/event-emitter';
import { CardReviewedEvent } from '@voclearn/api-repetition-domain';
import { Transaction } from '@voclearn/api/shared/application';

@Injectable()
export class UpdatePartitionWhenCardReviewedEventHandler {
  private readonly logger = new Logger(
    UpdatePartitionWhenCardReviewedEventHandler.name
  );

  constructor(private readonly learnerRepository: LearnerRepository) {}

  @OnEvent(CardReviewedEvent.name)
  async handle(
    event: CardReviewedEvent,
    transaction: Transaction
  ): Promise<void> {
    await this.learnerRepository.removeCardFromPartition(
      event.cardId,
      event.learnerId,
      transaction
    );

    this.logger.debug(
      `Partition updated after card ${event.cardId.value} reviewed by learner ${event.learnerId}`
    );
  }
}
