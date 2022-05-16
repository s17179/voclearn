import { CardId, LearnerId } from '@voclearn/api-repetition-domain';

export class RemoveCardCommand {
  constructor(readonly cardId: CardId, readonly learnerId: LearnerId) {}
}
