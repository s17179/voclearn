import { OnEvent } from '@nestjs/event-emitter';
import { CardAddedEvent } from '@voclearn/api-repetition-domain';
import { Injectable, Logger } from '@nestjs/common';
import { Transaction } from '@voclearn/api/shared/application';
import { LearnerRepository } from '../gateways/learner.repository';

@Injectable()
export class UpdatePartitionWhenCardAddedEventHandler {
  private readonly logger = new Logger(
    UpdatePartitionWhenCardAddedEventHandler.name
  );

  constructor(private readonly learnerRepository: LearnerRepository) {}

  @OnEvent(CardAddedEvent.name)
  async handle(event: CardAddedEvent, transaction: Transaction): Promise<void> {
    await this.learnerRepository.addCardToPartition(
      event.cardId,
      event.learnerId,
      transaction
    );

    this.logger.debug(
      `Partition updated after card ${event.cardId.value} added by learner ${event.learnerId}`
    );
  }
}
