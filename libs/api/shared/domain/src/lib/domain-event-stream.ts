import { IEvent } from '@nestjs/cqrs';

export class DomainEventStream {
  constructor(private events: IEvent[] = []) {}

  append(event: IEvent): void {
    this.events.push(event);
  }

  collect(): IEvent[] {
    this.assertThatHasAtLeastOneEvent();

    const events = this.events;

    this.flush();

    return events;
  }

  copy(): DomainEventStream {
    return new DomainEventStream(this.events);
  }

  private flush(): void {
    this.events = [];
  }

  private assertThatHasAtLeastOneEvent(): void {
    if (this.events.length === 0) {
      throw new Error('There are no events in the current stream');
    }
  }
}
