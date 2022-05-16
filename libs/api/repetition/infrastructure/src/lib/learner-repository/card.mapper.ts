import { Injectable } from '@nestjs/common';
import {
  Card,
  CurrentDeckCard,
  LearningSession,
  RetiredDeckCard,
  SessionDeck,
  SessionDeckCard,
} from '@voclearn/api-repetition-domain';
import { Uuid } from '@voclearn/api/shared/domain';
import { CardEntity } from './card.entity';
import { LearnerEntity } from './learner.entity';

@Injectable()
export class CardMapper {
  map(entity: CardEntity): Card {
    const cardId = new Uuid(entity.id);

    switch (entity.type) {
      case CurrentDeckCard.name:
        return new CurrentDeckCard(cardId);
      case SessionDeckCard.name: {
        const sessionDeckNumbers = entity.sessionDeckNumbers;

        if (sessionDeckNumbers === null) {
          throw new Error(
            `Session deck numbers cannot be null for a card of type ${SessionDeckCard.name}`
          );
        }

        return new SessionDeckCard(cardId, new SessionDeck(sessionDeckNumbers));
      }
      case RetiredDeckCard.name: {
        const retiredInSession = entity.retiredInSession;

        if (retiredInSession === null) {
          throw new Error(
            `Retired in session cannot be null for a card of type ${RetiredDeckCard.name}`
          );
        }

        return new RetiredDeckCard(
          cardId,
          new LearningSession(retiredInSession)
        );
      }
      default:
        throw new Error(`Unhandled card entity type: ${entity.type}`);
    }
  }

  mapToEntity(card: Card, learnerEntity: LearnerEntity): CardEntity {
    const cardType = card.constructor.name;
    const cardId = card.id.value;

    if (card instanceof SessionDeckCard) {
      return new CardEntity(
        cardId,
        cardType,
        learnerEntity,
        card.getSnapshot().sessionDeck.toNumbers(),
        null
      );
    }

    if (card instanceof RetiredDeckCard) {
      return new CardEntity(
        cardId,
        cardType,
        learnerEntity,
        null,
        card.getSnapshot().retiredInSession.toNumber()
      );
    }

    return new CardEntity(cardId, cardType, learnerEntity, null, null);
  }
}
