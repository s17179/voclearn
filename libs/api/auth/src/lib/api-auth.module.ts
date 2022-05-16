import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { ApiSharedInfrastructureFirebaseModule } from '@voclearn/api/shared/infrastructure/firebase';
import { ApiSharedInfrastructureJwtModule } from '@voclearn/api/shared/infrastructure/jwt';

@Module({
  imports: [
    ApiSharedInfrastructureFirebaseModule,
    ApiSharedInfrastructureJwtModule,
  ],
  providers: [AuthService, UserRepository],
  controllers: [AuthController],
  exports: [
    ApiSharedInfrastructureFirebaseModule,
    ApiSharedInfrastructureJwtModule,
  ],
})
export class ApiAuthModule {}
