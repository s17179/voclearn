import { Injectable } from '@nestjs/common';
import { User } from './dto/user';
import { Password } from './dto/password';
import { Credentials } from './dto/credentials';
import { AuthTokens } from './dto/auth-tokens';
import {
  FirebaseAdmin,
  FirebaseApi,
} from '@voclearn/api/shared/infrastructure/firebase';
import { Token } from './dto/token';

@Injectable()
export class UserRepository {
  constructor(
    private readonly firebaseAdmin: FirebaseAdmin,
    private readonly firebaseApi: FirebaseApi
  ) {}

  async add(user: User, password: Password): Promise<void> {
    await this.firebaseAdmin.auth().createUser({
      email: user.email.value,
      emailVerified: true,
      password: password.value,
      displayName: user.name.toString(),
      disabled: false,
    });
  }

  async authenticate(credentials: Credentials): Promise<AuthTokens> {
    const response = await this.firebaseApi.signInWithEmailAndPassword(
      credentials.email.value,
      credentials.password.value
    );

    return {
      idToken: new Token(response.idToken),
      refreshToken: response.refreshToken,
    };
  }
}
