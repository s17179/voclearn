import { AssociationContract } from '@voclearn/contracts';

export class Association implements AssociationContract {
  constructor(readonly id: string, readonly note: string) {}
}
