import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { pluck } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { FirebaseConfig } from './config/firebase.config';
import { InjectConfig } from '@voclearn/api/shared/infrastructure/config';
import { FirebaseConfigProvider } from './config/firebase.config-provider';

interface SignInFirebaseResponse {
  kind: string;
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
}

interface RefreshTokenResponse {
  access_token: string;
  expires_in: string;
  token_type: string;
  refresh_token: string;
  id_token: string;
  user_id: string;
  project_id: string;
}

@Injectable()
export class FirebaseApi {
  constructor(
    private readonly httpService: HttpService,
    @InjectConfig(FirebaseConfigProvider)
    private readonly config: FirebaseConfig
  ) {}

  signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<SignInFirebaseResponse> {
    const response = this.httpService
      .post<SignInFirebaseResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.config.key}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(pluck('data'));

    return firstValueFrom(response);
  }

  refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const response = this.httpService
      .post<RefreshTokenResponse>(
        `https://securetoken.googleapis.com/v1/token?key=${this.config.key}`,
        {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }
      )
      .pipe(pluck('data'));

    return firstValueFrom(response);
  }
}
