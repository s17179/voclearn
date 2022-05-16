import { CardId } from './card-id';
import { LearningSession } from './learning-session';

export abstract class Card {
  constructor(readonly id: CardId) {}

  abstract reviewSuccessfully(session: LearningSession): Card;

  abstract reviewUnsuccessfully(session: LearningSession): Card;

  protected stay(): this {
    return this;
  }
}
