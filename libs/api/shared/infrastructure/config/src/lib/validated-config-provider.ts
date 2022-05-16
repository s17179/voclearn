import { Config, ConfigProvider } from './config-provider';
import { ConfigValidator } from './config.validator';

export class ValidatedConfigProvider extends ConfigProvider {
  constructor(private readonly configProvider: ConfigProvider) {
    super();
  }

  async provide(): Promise<Config> {
    const config: Config = await this.configProvider.provide();

    ConfigValidator.validate(config);

    return config;
  }
}
