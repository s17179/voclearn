import * as firebaseAdmin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

const app = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.applicationDefault(),
});

const firebaseAdminAuth = app.auth();

@Injectable()
export class FirebaseAdmin {
  auth(): firebaseAdmin.auth.Auth {
    return firebaseAdminAuth;
  }
}
