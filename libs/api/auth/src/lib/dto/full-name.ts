import { TinyType } from 'tiny-types';

const type = Symbol();

export class FullName extends TinyType {
  private readonly type: typeof type = type;

  constructor(
    public readonly firstName: string,
    public readonly lastName: string
  ) {
    super();
  }

  toString(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
