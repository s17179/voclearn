import { Injectable } from '@nestjs/common';
import { FirebaseAdmin } from '@voclearn/api/shared/infrastructure/firebase';
import { JwtTokenValidator } from './jwt-token.validator';

@Injectable()
export class FirebaseJwtTokenValidator implements JwtTokenValidator {
  constructor(private readonly firebaseAdmin: FirebaseAdmin) {}

  async assertValid(token: string): Promise<void> {
    await this.firebaseAdmin.auth().verifyIdToken(token);
  }
}
