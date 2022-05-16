import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddCardCommand } from '../boundaries/commands/add-card.command';
import { CardId } from '@voclearn/api-repetition-domain';
import { Transaction, Transactional } from '@voclearn/api/shared/application';
import { LearnerRepository } from '../gateways/learner.repository';
import { RepetitionRepository } from '../gateways/repetition.repository';
import { Logger } from '@nestjs/common';

@CommandHandler(AddCardCommand)
export class AddCardUseCase implements ICommandHandler<AddCardCommand, void> {
  private readonly logger = new Logger(AddCardUseCase.name);

  constructor(
    private readonly transactional: Transactional,
    private readonly learnerRepository: LearnerRepository,
    private readonly repetitionRepository: RepetitionRepository
  ) {}

  async execute(command: AddCardCommand): Promise<void> {
    await this.transactional.execute(async (transaction) => {
      await this.assertCardDoesNotExist(command.cardId, transaction);

      const learner = await this.learnerRepository.get(
        command.learnerId,
        transaction
      );

      const repetition = learner.addCard(command.cardId);

      await this.repetitionRepository.save(repetition, transaction);
    });

    this.logger.debug(
      `Card ${command.cardId.value} added by learner ${command.learnerId}`
    );
  }

  private async assertCardDoesNotExist(
    cardId: CardId,
    transaction: Transaction
  ): Promise<void> {
    if (await this.learnerRepository.hasCard(cardId, transaction)) {
      throw new Error(`Card ${cardId.value} already exists`);
    }
  }
}
