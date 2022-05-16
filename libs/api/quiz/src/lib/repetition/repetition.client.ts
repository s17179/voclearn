import { Injectable } from '@nestjs/common';
import {
  GetCardToRepeatQuery,
  RepeatSuccessfullyCommand,
  RepeatUnsuccessfullyCommand,
  RepetitionFacade,
} from '@voclearn/api-repetition-application';
import { UserId, Uuid } from '@voclearn/api/shared/domain';

@Injectable()
export class RepetitionClient {
  constructor(private readonly repetitionFacade: RepetitionFacade) {}

  getNextQuestionId(userId: UserId): Promise<Uuid> {
    return this.repetitionFacade.getCardToRepeat(
      new GetCardToRepeatQuery(userId)
    );
  }

  answerQuestionSuccessfully(questionId: Uuid, userId: UserId): Promise<void> {
    return this.repetitionFacade.repeatSuccessfully(
      new RepeatSuccessfullyCommand(questionId, userId)
    );
  }

  answerQuestionUnsuccessfully(
    questionId: Uuid,
    userId: UserId
  ): Promise<void> {
    return this.repetitionFacade.repeatUnsuccessfully(
      new RepeatUnsuccessfullyCommand(questionId, userId)
    );
  }
}
