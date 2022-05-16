import { CardId } from './card-id';
import { LearnerId } from './learner-id';

export class CardAddedEvent {
  constructor(readonly cardId: CardId, readonly learnerId: LearnerId) {}
}
