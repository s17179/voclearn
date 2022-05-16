import { CardId, LearnerId } from '@voclearn/api-repetition-domain';

export class RepeatUnsuccessfullyCommand {
  constructor(readonly cardId: CardId, readonly learnerId: LearnerId) {}
}
