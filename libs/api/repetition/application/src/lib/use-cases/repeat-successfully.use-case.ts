import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RepeatSuccessfullyCommand } from '../boundaries/commands/repeat-successfully.command';
import { Transactional } from '@voclearn/api/shared/application';
import { RepetitionRepository } from '../gateways/repetition.repository';
import { Logger } from '@nestjs/common';

@CommandHandler(RepeatSuccessfullyCommand)
export class RepeatSuccessfullyUseCase
  implements ICommandHandler<RepeatSuccessfullyCommand, void>
{
  private readonly logger = new Logger(RepeatSuccessfullyUseCase.name);

  constructor(
    private readonly transactional: Transactional,
    private readonly repetitionRepository: RepetitionRepository
  ) {}

  async execute(command: RepeatSuccessfullyCommand): Promise<void> {
    await this.transactional.execute(async (transaction) => {
      const repetition = await this.repetitionRepository.get(
        command.cardId,
        command.learnerId,
        transaction
      );

      const successfulRepetition = repetition.repeatSuccessfully();

      await this.repetitionRepository.save(successfulRepetition, transaction);
    });

    this.logger.debug(
      `Card ${command.cardId.value} repeated successfully by learner ${command.learnerId}`
    );
  }
}
