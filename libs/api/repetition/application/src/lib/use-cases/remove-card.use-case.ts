import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveCardCommand } from '../boundaries/commands/remove-card.command';
import { Transactional } from '@voclearn/api/shared/application';
import { LearnerRepository } from '../gateways/learner.repository';
import { Logger } from '@nestjs/common';

@CommandHandler(RemoveCardCommand)
export class RemoveCardUseCase
  implements ICommandHandler<RemoveCardCommand, void>
{
  private readonly logger = new Logger(RemoveCardUseCase.name);

  constructor(
    private readonly transactional: Transactional,
    private readonly learnerRepository: LearnerRepository
  ) {}

  async execute(command: RemoveCardCommand): Promise<void> {
    await this.transactional.execute(async (transaction) => {
      const isPartitionDeleted =
        await this.learnerRepository.removeCardFromPartition(
          command.cardId,
          command.learnerId,
          transaction
        );

      await this.learnerRepository.removeCard(command.cardId, transaction);

      if (isPartitionDeleted) {
        const learner = await this.learnerRepository.get(
          command.learnerId,
          transaction
        );

        learner.removeCard();

        await this.learnerRepository.save(learner, transaction);
      }
    });

    this.logger.debug(
      `Card ${command.cardId.value} removed by learner ${command.learnerId}`
    );
  }
}
