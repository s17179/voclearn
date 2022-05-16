import { Injectable } from '@nestjs/common';
import {
  AddCardCommand,
  RemoveCardCommand,
  RepetitionFacade,
} from '@voclearn/api-repetition-application';
import { Uuid } from '@voclearn/api/shared/domain';

@Injectable()
export class RepetitionClient {
  constructor(private readonly repetitionFacade: RepetitionFacade) {}

  addWord(wordId: Uuid, userId: string): Promise<void> {
    return this.repetitionFacade.addCard(new AddCardCommand(wordId, userId));
  }

  removeWord(wordId: Uuid, userId: string): Promise<void> {
    return this.repetitionFacade.removeCard(
      new RemoveCardCommand(wordId, userId)
    );
  }
}
