import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LearnerResetEvent } from '@voclearn/api-repetition-domain';
import { Transaction } from '@voclearn/api/shared/application';
import { LearnerRepository } from '../gateways/learner.repository';

@Injectable()
export class ResetCardsWhenLearnerResetEventHandler {
  private readonly logger = new Logger(
    ResetCardsWhenLearnerResetEventHandler.name
  );

  constructor(private readonly learnerRepository: LearnerRepository) {}

  @OnEvent(LearnerResetEvent.name)
  async handle(
    event: LearnerResetEvent,
    transaction: Transaction
  ): Promise<void> {
    await this.learnerRepository.reset(event.learnerId, transaction);

    this.logger.debug(`Cards reset after learner ${event.learnerId} reset`);
  }
}
