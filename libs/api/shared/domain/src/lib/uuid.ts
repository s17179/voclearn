import { TinyTypeOf } from 'tiny-types';
import { validate as uuidValidate } from 'uuid';

const type = Symbol();

export class Uuid extends TinyTypeOf<string>() {
  private readonly type: typeof type = type;

  constructor(public readonly value: string) {
    super(value);
    this.assertIsValid();
  }

  private assertIsValid(): void {
    if (!uuidValidate(this.value)) {
      throw new Error(`Incorrect UUID given: ${this.value}`);
    }
  }
}
