import { DomainEventPublisher } from './domain-event-publisher';
import { Injectable } from '@nestjs/common';
import { IEvent } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Transaction } from '@voclearn/api/shared/application';

@Injectable()
export class SynchronousDomainEventPublisher implements DomainEventPublisher {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async publishAll(events: IEvent[], transaction: Transaction): Promise<void> {
    for (const event of events) {
      await this.eventEmitter.emitAsync(
        event.constructor.name,
        event,
        transaction
      );
    }
  }
}
