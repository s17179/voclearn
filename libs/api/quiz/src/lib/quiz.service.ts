import { Injectable, Logger } from '@nestjs/common';
import { RepetitionClient } from './repetition/repetition.client';
import { UserId, Uuid } from '@voclearn/api/shared/domain';
import { Question } from './dto/question';
import { VocabularyClient } from './vocabulary/vocabulary.client';
import { AnswerQuestionRequest } from './dto/answer-question.request';
import { AnsweredQuestion } from './dto/answered-question';

@Injectable()
export class QuizService {
  private readonly logger = new Logger(QuizService.name);

  constructor(
    private readonly repetitionClient: RepetitionClient,
    private readonly vocabularyClient: VocabularyClient
  ) {}

  async getNextQuestion(userId: UserId): Promise<Question> {
    const questionId = await this.repetitionClient.getNextQuestionId(userId);

    const question = await this.vocabularyClient.getQuestion(
      questionId,
      userId
    );

    this.logger.debug(
      `Question ${question.question} returned for user ${userId}`
    );

    return question;
  }

  async answerQuestion(
    questionId: Uuid,
    dto: AnswerQuestionRequest,
    userId: UserId
  ): Promise<AnsweredQuestion> {
    const correctAnswer = await this.vocabularyClient.getAnswer(
      questionId,
      userId
    );

    const isAnswerCorrect = correctAnswer === dto.answer;

    if (isAnswerCorrect) {
      await this.repetitionClient.answerQuestionSuccessfully(
        questionId,
        userId
      );

      this.logger.debug(
        `Question ${questionId.value} answered successfully by user ${userId}`
      );
    } else {
      await this.repetitionClient.answerQuestionUnsuccessfully(
        questionId,
        userId
      );

      this.logger.debug(
        `Question ${questionId.value} answered unsuccessfully by user ${userId}`
      );
    }

    return new AnsweredQuestion(isAnswerCorrect, correctAnswer);
  }
}
