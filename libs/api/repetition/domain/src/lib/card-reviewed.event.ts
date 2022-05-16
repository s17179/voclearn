import { LearnerId } from './learner-id';
import { CardId } from './card-id';

export class CardReviewedEvent {
  constructor(readonly cardId: CardId, readonly learnerId: LearnerId) {}
}
