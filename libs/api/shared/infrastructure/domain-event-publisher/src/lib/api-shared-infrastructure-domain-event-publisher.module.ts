import { Module } from '@nestjs/common';
import { SynchronousDomainEventPublisher } from './synchronous-domain-event-publisher';
import { DomainEventPublisher } from './domain-event-publisher';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [
    {
      provide: DomainEventPublisher,
      useClass: SynchronousDomainEventPublisher,
    },
  ],
  exports: [DomainEventPublisher],
})
export class ApiSharedInfrastructureDomainEventPublisherModule {}
