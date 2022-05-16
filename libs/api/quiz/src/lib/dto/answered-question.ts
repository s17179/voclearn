import { AnsweredQuestionContract } from '@voclearn/contracts';

export class AnsweredQuestion implements AnsweredQuestionContract {
  constructor(readonly isCorrect: boolean, readonly correctAnswer: string) {}
}
