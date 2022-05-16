import { WordGroupContract } from '@voclearn/contracts';

export class WordGroup implements WordGroupContract {
  constructor(readonly id: string, readonly name: string) {}
}
