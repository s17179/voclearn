import { Module } from '@nestjs/common';
import { JwtTokenDecoder } from './jwt-token.decoder';
import { ApiSharedInfrastructureFirebaseModule } from '@voclearn/api/shared/infrastructure/firebase';
import { JwtTokenValidator } from './jwt-token.validator';
import { FirebaseJwtTokenValidator } from './firebase-jwt-token.validator';
import { JsonWebTokenJwtTokenDecoder } from './json-web-token-jwt-token.decoder';
import { JwtTokenRefresher } from './jwt-token.refresher';
import { FirebaseJwtTokenRefresher } from './firebase-jwt-token.refresher';

@Module({
  imports: [ApiSharedInfrastructureFirebaseModule],
  providers: [
    { provide: JwtTokenDecoder, useClass: JsonWebTokenJwtTokenDecoder },
    { provide: JwtTokenValidator, useClass: FirebaseJwtTokenValidator },
    { provide: JwtTokenRefresher, useClass: FirebaseJwtTokenRefresher },
  ],
  exports: [JwtTokenDecoder, JwtTokenValidator, JwtTokenRefresher],
})
export class ApiSharedInfrastructureJwtModule {}
