import { LearnerId } from '@voclearn/api-repetition-domain';

export class GetCardToRepeatQuery {
  constructor(readonly learnerId: LearnerId) {}
}
