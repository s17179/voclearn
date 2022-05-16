import { Card } from './card';
import { RetiredDeckCard } from './retired-deck-card';
import { CardId } from './card-id';
import { CurrentDeckCard } from './current-deck-card';
import { SessionDeck } from './session-deck';
import { LearningSession } from './learning-session';
import { SessionDeckCardSnapshot } from './snapshots';

export class SessionDeckCard extends Card {
  constructor(id: CardId, private readonly sessionDeck: SessionDeck) {
    super(id);
  }

  static transferToDeckThatBeginsWithSessionNumber(
    id: CardId,
    session: LearningSession
  ): SessionDeckCard {
    return new SessionDeckCard(id, SessionDeck.createBasedOnSession(session));
  }

  reviewSuccessfully(
    session: LearningSession
  ): SessionDeckCard | RetiredDeckCard {
    this.assertSessionDeckContainsCurrentSessionNumber(session);

    if (this.lastSessionDeckNumberMatchesCurrentSessionNumber(session)) {
      return RetiredDeckCard.move(this.id, session);
    }

    return this.stay();
  }

  reviewUnsuccessfully(session: LearningSession): CurrentDeckCard {
    this.assertSessionDeckContainsCurrentSessionNumber(session);

    return CurrentDeckCard.moveBack(this.id);
  }

  private lastSessionDeckNumberMatchesCurrentSessionNumber(
    session: LearningSession
  ): boolean {
    return this.sessionDeck.lastNumberMatchesSessionNumber(session);
  }

  getSnapshot(): SessionDeckCardSnapshot {
    return {
      sessionDeck: this.sessionDeck,
    };
  }

  private assertSessionDeckContainsCurrentSessionNumber(
    session: LearningSession
  ): void {
    if (!this.sessionDeck.containsSessionNumber(session)) {
      throw new Error(
        'Session deck does not container the current session number'
      );
    }
  }
}
