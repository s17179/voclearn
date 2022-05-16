// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Config {}

export abstract class ConfigProvider<T extends Config = Config> {
  abstract provide(): Promise<T>;
}
