import { Inject, Type } from '@nestjs/common';
import { ConfigProvider } from './config-provider';

export const getConfigProviderToken: (
  configProvider: Type<ConfigProvider>
) => string = (configProvider: Type<ConfigProvider>) =>
  `config-provider-${configProvider.name}`;

export const InjectConfigProvider: (
  configProvider: Type<ConfigProvider>
) => ParameterDecorator = (configProvider: Type<ConfigProvider>) =>
  Inject(getConfigProviderToken(configProvider));
