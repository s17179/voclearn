import { LearnerId } from './learner-id';
import { LearningSession } from './learning-session';
import { Partition } from './partition';
import { LearnerSnapshot } from './snapshots';
import { LearnerSessionMovedEvent } from './learner-session-moved.event';
import { LearnerResetEvent } from './learner-reset.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { Card } from './card';
import { Repetition } from './repetition';
import { CardId } from './card-id';
import { CardAddedEvent } from './card-added.event';
import { CurrentDeckCard } from './current-deck-card';
import { CardReviewedEvent } from './card-reviewed.event';

export class Learner extends AggregateRoot {
  constructor(
    private readonly id: LearnerId,
    private currentSession: LearningSession,
    private partition: Partition
  ) {
    super();
  }

  addCard(cardId: CardId): Repetition {
    this.partition = this.partition.increase();

    const card = new CurrentDeckCard(cardId);

    this.apply(new CardAddedEvent(cardId, this.id));

    return new Repetition(this, card);
  }

  removeCard(): void {
    this.partition = this.partition.decrease();

    if (this.partition.isEmpty()) {
      this.moveToNextSession();
    }
  }

  reviewCardSuccessfully(card: Card): Repetition {
    const reviewedCard = card.reviewSuccessfully(this.currentSession);

    this.reviewCard(reviewedCard.id);

    return new Repetition(this, reviewedCard);
  }

  reviewCardUnsuccessfully(card: Card): Repetition {
    const reviewedCard = card.reviewUnsuccessfully(this.currentSession);

    this.reviewCard(reviewedCard.id);

    return new Repetition(this, reviewedCard);
  }

  updatePartition(partition: Partition): void {
    this.partition = partition;

    if (this.partition.isEmpty()) {
      this.reset();
    }
  }

  getSnapshot(): LearnerSnapshot {
    return {
      id: this.id,
      currentSession: this.currentSession,
      partition: this.partition,
    };
  }

  private reviewCard(cardId: CardId): void {
    this.partition = this.partition.decrease();

    this.apply(new CardReviewedEvent(cardId, this.id));

    if (this.partition.isEmpty()) {
      this.moveToNextSession();
    }
  }

  private reset(): void {
    this.currentSession = LearningSession.start();

    this.apply(new LearnerResetEvent(this.id));
  }

  private moveToNextSession(): void {
    this.currentSession = this.currentSession.next();

    this.apply(new LearnerSessionMovedEvent(this.id, this.currentSession));
  }
}
