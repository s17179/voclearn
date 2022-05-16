import {
  DynamicModule,
  Module,
  ModuleMetadata,
  Provider,
  Type,
} from '@nestjs/common';
import { ConfigProvider } from './config-provider';
import { ValidatedConfigProvider } from './validated-config-provider';
import { getConfigProviderToken } from './inject-config-provider.decorator';
import { getConfigToken } from './inject-config.decorator';

export type ConfigOptions = Pick<ModuleMetadata, 'imports'>;

@Module({})
export class ApiSharedInfrastructureConfigModule {
  static registerConfigProvider(
    configProviderType: Type<ConfigProvider>,
    options?: ConfigOptions
  ): DynamicModule {
    const config: Provider = {
      provide: getConfigToken(configProviderType),
      inject: [configProviderType],
      useFactory: (provider: ConfigProvider) =>
        new ValidatedConfigProvider(provider).provide(),
    };

    const configProvider: Provider = {
      provide: getConfigProviderToken(configProviderType),
      inject: [configProviderType],
      useFactory: (provider: ConfigProvider) =>
        new ValidatedConfigProvider(provider),
    };

    return {
      module: ApiSharedInfrastructureConfigModule,
      imports: [...(options?.imports || [])],
      providers: [configProviderType, config, configProvider],
      exports: [config, configProvider],
    };
  }
}
