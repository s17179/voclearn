import { IEvent } from '@nestjs/cqrs';
import { Transaction } from '@voclearn/api/shared/application';

export abstract class DomainEventPublisher {
  abstract publishAll(
    events: IEvent[],
    transaction: Transaction
  ): Promise<void>;
}
