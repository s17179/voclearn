import { Inject, Type } from '@nestjs/common';
import { ConfigProvider } from './config-provider';

export const getConfigToken: (
  configProvider: Type<ConfigProvider>
) => string = (configProvider: Type<ConfigProvider>) =>
  `config-${configProvider.name}`;

export const InjectConfig: (
  configProvider: Type<ConfigProvider>
) => ParameterDecorator = (configProvider: Type<ConfigProvider>) =>
  Inject(getConfigToken(configProvider));
