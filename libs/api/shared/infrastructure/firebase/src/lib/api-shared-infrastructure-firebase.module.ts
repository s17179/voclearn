import { Module } from '@nestjs/common';
import { FirebaseAdmin } from './firebase-admin';
import { FirebaseApi } from './firebase-api';
import { HttpModule } from '@nestjs/axios';
import { FirebaseConfigModule } from './config/firebase-config.module';

@Module({
  imports: [FirebaseConfigModule, HttpModule],
  providers: [FirebaseAdmin, FirebaseApi],
  exports: [FirebaseAdmin, FirebaseApi],
})
export class ApiSharedInfrastructureFirebaseModule {}
