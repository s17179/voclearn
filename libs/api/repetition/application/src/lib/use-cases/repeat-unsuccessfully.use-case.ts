import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RepeatUnsuccessfullyCommand } from '../boundaries/commands/repeat-unsuccessfully.command';
import { Transactional } from '@voclearn/api/shared/application';
import { RepetitionRepository } from '../gateways/repetition.repository';
import { Logger } from '@nestjs/common';

@CommandHandler(RepeatUnsuccessfullyCommand)
export class RepeatUnsuccessfullyUseCase
  implements ICommandHandler<RepeatUnsuccessfullyCommand, void>
{
  private readonly logger = new Logger(RepeatUnsuccessfullyUseCase.name);

  constructor(
    private readonly transactional: Transactional,
    private readonly repetitionRepository: RepetitionRepository
  ) {}

  async execute(command: RepeatUnsuccessfullyCommand): Promise<void> {
    await this.transactional.execute(async (transaction) => {
      const repetition = await this.repetitionRepository.get(
        command.cardId,
        command.learnerId,
        transaction
      );

      const successfulRepetition = repetition.repeatUnsuccessfully();

      await this.repetitionRepository.save(successfulRepetition, transaction);
    });

    this.logger.debug(
      `Card ${command.cardId.value} repeated unsuccessfully by learner ${command.learnerId}`
    );
  }
}
