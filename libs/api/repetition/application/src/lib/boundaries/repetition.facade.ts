import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { RepeatSuccessfullyCommand } from './commands/repeat-successfully.command';
import { AddCardCommand } from './commands/add-card.command';
import { RepeatUnsuccessfullyCommand } from './commands/repeat-unsuccessfully.command';
import { GetCardToRepeatQuery } from './queries/get-card-to-repeat.query';
import { CardId } from '@voclearn/api-repetition-domain';
import { RemoveCardCommand } from './commands/remove-card.command';

@Injectable()
export class RepetitionFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  addCard(command: AddCardCommand): Promise<void> {
    return this.commandBus.execute(command);
  }

  removeCard(command: RemoveCardCommand): Promise<void> {
    return this.commandBus.execute(command);
  }

  repeatSuccessfully(command: RepeatSuccessfullyCommand): Promise<void> {
    return this.commandBus.execute(command);
  }

  repeatUnsuccessfully(command: RepeatUnsuccessfullyCommand): Promise<void> {
    return this.commandBus.execute(command);
  }

  getCardToRepeat(query: GetCardToRepeatQuery): Promise<CardId> {
    return this.queryBus.execute(query);
  }
}
