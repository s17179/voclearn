import { Module } from '@nestjs/common';
import { ApiSharedInfrastructureDatabaseModule } from '@voclearn/api/shared/infrastructure/database';
import { Transactional } from '@voclearn/api/shared/application';
import { TypeormTransactional } from './typeorm-transactional';

@Module({
  imports: [ApiSharedInfrastructureDatabaseModule],
  providers: [
    {
      provide: Transactional,
      useClass: TypeormTransactional,
    },
  ],
  exports: [Transactional],
})
export class ApiSharedInfrastructureTransactionalModule {}
