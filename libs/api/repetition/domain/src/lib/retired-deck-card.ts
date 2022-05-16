import { Card } from './card';
import { CardId } from './card-id';
import { CurrentDeckCard } from './current-deck-card';
import { LearningSession } from './learning-session';
import { RetiredDeckCardSnapshot } from './snapshots';

export class RetiredDeckCard extends Card {
  constructor(id: CardId, private readonly retiredInSession: LearningSession) {
    super(id);
  }

  static move(
    cardId: CardId,
    retiredInSession: LearningSession
  ): RetiredDeckCard {
    return new RetiredDeckCard(cardId, retiredInSession);
  }

  reviewSuccessfully(session: LearningSession): Card {
    this.assertRetiredCardIsReviewedInTheSessionWhenItRetired(session);

    return this.stay();
  }

  reviewUnsuccessfully(session: LearningSession): CurrentDeckCard {
    this.assertRetiredCardIsReviewedInTheSessionWhenItRetired(session);

    return CurrentDeckCard.moveBack(this.id);
  }

  getSnapshot(): RetiredDeckCardSnapshot {
    return {
      retiredInSession: this.retiredInSession,
    };
  }

  private assertRetiredCardIsReviewedInTheSessionWhenItRetired(
    session: LearningSession
  ): void {
    if (!this.retiredInSession.equals(session)) {
      throw new Error(
        'Retired card can be reviewed in the session when it retired only'
      );
    }
  }
}
