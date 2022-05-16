import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AnsweredQuestionContract,
  AnswerQuestionRequestContract,
  QuestionContract,
} from '@voclearn/contracts';

@Injectable({ providedIn: 'root' })
export class QuizService {
  constructor(private readonly httpClient: HttpClient) {}

  getQuestion(): Observable<QuestionContract> {
    return this.httpClient.get<QuestionContract>('/api/quiz/question');
  }

  answerQuestion(
    questionId: string,
    contract: AnswerQuestionRequestContract
  ): Observable<AnsweredQuestionContract> {
    return this.httpClient.post<AnsweredQuestionContract>(
      `/api/quiz/question/${questionId}/answer`,
      contract
    );
  }
}
