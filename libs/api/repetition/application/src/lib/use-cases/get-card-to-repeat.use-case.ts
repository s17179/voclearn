import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCardToRepeatQuery } from '../boundaries/queries/get-card-to-repeat.query';
import { CardId } from '@voclearn/api-repetition-domain';
import { GetCardToRepeatDataProvider } from '../gateways/get-card-to-repeat.data-provider';

@QueryHandler(GetCardToRepeatQuery)
export class GetCardToRepeatUseCase
  implements IQueryHandler<GetCardToRepeatQuery, CardId>
{
  constructor(private readonly dataProvider: GetCardToRepeatDataProvider) {}

  execute(query: GetCardToRepeatQuery): Promise<CardId> {
    return this.dataProvider.provide(query);
  }
}
