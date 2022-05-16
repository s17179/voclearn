// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { IsNotEmpty, IsString } from 'class-validator';

export class FirebaseConfig {
  @IsNotEmpty()
  @IsString()
  readonly key: string = process.env.FIREBASE_KEY;
}
