import { ConfigProvider } from '@voclearn/api/shared/infrastructure/config';
import { FirebaseConfig } from './firebase.config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseConfigProvider extends ConfigProvider<FirebaseConfig> {
  async provide(): Promise<FirebaseConfig> {
    return new FirebaseConfig();
  }
}
