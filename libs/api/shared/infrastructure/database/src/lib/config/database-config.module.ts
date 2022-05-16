import { Module } from '@nestjs/common';
import { ApiSharedInfrastructureConfigModule } from '@voclearn/api/shared/infrastructure/config';
import { DatabaseConfigProvider } from './database.config-provider';

@Module({
  imports: [
    ApiSharedInfrastructureConfigModule.registerConfigProvider(
      DatabaseConfigProvider
    ),
  ],
  exports: [ApiSharedInfrastructureConfigModule],
})
export class DatabaseConfigModule {}
