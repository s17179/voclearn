import { CardId } from '@voclearn/api-repetition-domain';
import { GetCardToRepeatQuery } from '../boundaries/queries/get-card-to-repeat.query';

export abstract class GetCardToRepeatDataProvider {
  abstract provide(query: GetCardToRepeatQuery): Promise<CardId>;
}
