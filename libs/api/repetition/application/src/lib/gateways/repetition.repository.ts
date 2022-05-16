import { CardId, LearnerId, Repetition } from '@voclearn/api-repetition-domain';
import { Transaction } from '@voclearn/api/shared/application';

export abstract class RepetitionRepository {
  abstract get(
    cardId: CardId,
    learnerId: LearnerId,
    transaction: Transaction
  ): Promise<Repetition>;

  abstract save(
    repetition: Repetition,
    transaction: Transaction
  ): Promise<void>;
}
