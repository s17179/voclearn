import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { Question } from './dto/question';
import { QuizService } from './quiz.service';
import { AnswerQuestionRequest } from './dto/answer-question.request';
import { Uuid } from '@voclearn/api/shared/domain';
import { AnsweredQuestion } from './dto/answered-question';
import { AuthenticatedUser, AuthUser } from '@voclearn/api/auth';

@Controller('quiz')
export class QuizController {
  constructor(private readonly service: QuizService) {}

  @Get('question')
  @HttpCode(HttpStatus.OK)
  getNextQuestion(@AuthUser() user: AuthenticatedUser): Promise<Question> {
    return this.service.getNextQuestion(user.id);
  }

  @Post('question/:id/answer')
  @HttpCode(HttpStatus.OK)
  answerQuestion(
    @Param('id') id: string,
    @Body() requestBody: AnswerQuestionRequest,
    @AuthUser() user: AuthenticatedUser
  ): Promise<AnsweredQuestion> {
    return this.service.answerQuestion(new Uuid(id), requestBody, user.id);
  }
}
