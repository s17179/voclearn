import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WordController } from './word/word.controller';
import { WordService } from './word/word.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordEntity } from './word/word.entity';
import { WordGroupController } from './word-group/word-group.controller';
import { WordGroupService } from './word-group/word-group.service';
import { WordGroupEntity } from './word-group/word-group.entity';
import { AssociationEntity } from './association/association.entity';
import { WordGroupRepository } from './word-group/word-group.repository';
import { ApiSharedInfrastructureDatabaseModule } from '@voclearn/api/shared/infrastructure/database';
import { RepetitionClient } from './repetition/repetition.client';
import { ApiRepetitionModule } from '@voclearn/api-repetition-shell';
import { VocabularyFacade } from './api/vocabulary.facade';
import { WordMapper } from './word/word.mapper';
import { AssociationMapper } from './association/association.mapper';
import { WordGroupMapper } from './word-group/word-group.mapper';
import {
  ApiAuthModule,
  AuthMiddleware,
  RefreshTokenAuthMiddleware,
} from '@voclearn/api/auth';

@Module({
  imports: [
    ApiSharedInfrastructureDatabaseModule,
    TypeOrmModule.forFeature([
      WordEntity,
      WordGroupEntity,
      WordGroupRepository,
      AssociationEntity,
    ]),
    ApiAuthModule,
    ApiRepetitionModule,
  ],
  providers: [
    WordService,
    WordGroupService,
    RepetitionClient,
    VocabularyFacade,
    WordMapper,
    AssociationMapper,
    WordGroupMapper,
  ],
  controllers: [WordController, WordGroupController],
  exports: [VocabularyFacade],
})
export class ApiVocabularyModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RefreshTokenAuthMiddleware, AuthMiddleware)
      .forRoutes(WordController, WordGroupController);
  }
}
