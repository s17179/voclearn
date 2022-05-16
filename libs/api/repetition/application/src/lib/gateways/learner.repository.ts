import {
  CardId,
  Learner,
  LearnerId,
  LearningSession,
  Partition,
} from '@voclearn/api-repetition-domain';
import { Transaction } from '@voclearn/api/shared/application';

export abstract class LearnerRepository {
  abstract get(
    learnerId: LearnerId,
    transaction: Transaction
  ): Promise<Learner>;

  abstract save(learner: Learner, transaction: Transaction): Promise<void>;

  abstract hasCard(cardId: CardId, transaction: Transaction): Promise<boolean>;

  abstract addCardToPartition(
    cardId: CardId,
    learnerId: LearnerId,
    transaction: Transaction
  ): Promise<void>;

  abstract fillPartition(
    session: LearningSession,
    learnerId: LearnerId,
    transaction: Transaction
  ): Promise<Partition>;

  abstract removeCardFromPartition(
    cardId: CardId,
    learnerId: LearnerId,
    transaction: Transaction
  ): Promise<boolean>;

  abstract reset(learnerId: LearnerId, transaction: Transaction): Promise<void>;

  abstract removeCard(cardId: CardId, transaction: Transaction): Promise<void>;
}
