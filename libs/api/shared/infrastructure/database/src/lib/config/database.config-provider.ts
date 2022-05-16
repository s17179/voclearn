import { ConfigProvider } from '@voclearn/api/shared/infrastructure/config';
import { DatabaseConfig } from './database.config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseConfigProvider extends ConfigProvider<DatabaseConfig> {
  async provide(): Promise<DatabaseConfig> {
    return new DatabaseConfig();
  }
}
