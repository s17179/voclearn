import { AssociationContract } from './association.contract';
import { WordGroupContract } from './word-group.contract';

export interface WordContract {
  id: string;
  value: string;
  translation: string;
  association: AssociationContract;
  wordGroup: WordGroupContract;
}
