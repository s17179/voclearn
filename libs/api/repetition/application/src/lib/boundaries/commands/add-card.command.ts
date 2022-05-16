import { CardId, LearnerId } from '@voclearn/api-repetition-domain';

export class AddCardCommand {
  constructor(readonly cardId: CardId, readonly learnerId: LearnerId) {}
}
