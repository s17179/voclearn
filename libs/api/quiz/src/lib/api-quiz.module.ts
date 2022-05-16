import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { ApiRepetitionModule } from '@voclearn/api-repetition-shell';
import { RepetitionClient } from './repetition/repetition.client';
import { VocabularyClient } from './vocabulary/vocabulary.client';
import { ApiVocabularyModule } from '@voclearn/api/vocabulary';
import {
  ApiAuthModule,
  AuthMiddleware,
  RefreshTokenAuthMiddleware,
} from '@voclearn/api/auth';

@Module({
  imports: [ApiAuthModule, ApiRepetitionModule, ApiVocabularyModule],
  providers: [QuizService, RepetitionClient, VocabularyClient],
  controllers: [QuizController],
})
export class ApiQuizModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RefreshTokenAuthMiddleware, AuthMiddleware)
      .forRoutes(QuizController);
  }
}
