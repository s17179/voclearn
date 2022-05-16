import { Card } from './card';
import { SessionDeckCard } from './session-deck-card';
import { CardId } from './card-id';
import { LearningSession } from './learning-session';

export class CurrentDeckCard extends Card {
  static moveBack(cardId: CardId): CurrentDeckCard {
    return new CurrentDeckCard(cardId);
  }

  reviewSuccessfully(session: LearningSession): SessionDeckCard {
    return SessionDeckCard.transferToDeckThatBeginsWithSessionNumber(
      this.id,
      session
    );
  }

  reviewUnsuccessfully(session: LearningSession): CurrentDeckCard {
    return this.stay();
  }
}
