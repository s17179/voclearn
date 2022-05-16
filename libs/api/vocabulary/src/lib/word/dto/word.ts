import { Association } from '../../association/dto/association';
import { WordContract } from '@voclearn/contracts';
import { WordGroup } from '../../word-group/dto/word-group';

export class Word implements WordContract {
  constructor(
    readonly id: string,
    readonly value: string,
    readonly translation: string,
    readonly association: Association,
    readonly wordGroup: WordGroup
  ) {}
}
