import { CardId, LearnerId } from '@voclearn/api-repetition-domain';

export class RepeatSuccessfullyCommand {
  constructor(readonly cardId: CardId, readonly learnerId: LearnerId) {}
}
