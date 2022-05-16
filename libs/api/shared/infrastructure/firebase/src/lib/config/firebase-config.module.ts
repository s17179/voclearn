import { Module } from '@nestjs/common';
import { ApiSharedInfrastructureConfigModule } from '@voclearn/api/shared/infrastructure/config';
import { FirebaseConfigProvider } from './firebase.config-provider';

@Module({
  imports: [
    ApiSharedInfrastructureConfigModule.registerConfigProvider(
      FirebaseConfigProvider
    ),
  ],
  exports: [ApiSharedInfrastructureConfigModule],
})
export class FirebaseConfigModule {}
