import { JwtTokenRefresher, RefreshedTokens } from './jwt-token.refresher';
import { Injectable } from '@nestjs/common';
import { FirebaseApi } from '@voclearn/api/shared/infrastructure/firebase';

@Injectable()
export class FirebaseJwtTokenRefresher implements JwtTokenRefresher {
  constructor(private readonly firebaseApi: FirebaseApi) {}

  async refresh(refreshToken: string): Promise<RefreshedTokens> {
    const refreshTokenResponse = await this.firebaseApi.refreshToken(
      refreshToken
    );

    return {
      idToken: refreshTokenResponse.id_token,
      refreshToken: refreshTokenResponse.refresh_token,
    };
  }
}
