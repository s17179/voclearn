import { QuestionContract } from '@voclearn/contracts';

export class Question implements QuestionContract {
  constructor(
    readonly id: string,
    readonly question: string,
    readonly hint: string
  ) {}
}
