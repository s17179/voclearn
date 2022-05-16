import { Module } from '@nestjs/common';
import { ApiVocabularyModule } from '@voclearn/api/vocabulary';
import { ApiAuthModule } from '@voclearn/api/auth';
import { ApiQuizModule } from '@voclearn/api/quiz';

@Module({
  imports: [ApiAuthModule, ApiVocabularyModule, ApiQuizModule],
})
export class AppModule {}
