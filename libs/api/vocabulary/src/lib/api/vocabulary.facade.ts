import { Injectable } from '@nestjs/common';
import { WordService } from '../word/word.service';
import { UserId, Uuid } from '@voclearn/api/shared/domain';
import { Word } from '../word/dto/word';

@Injectable()
export class VocabularyFacade {
  constructor(private readonly wordService: WordService) {}

  getWord(wordId: Uuid, userId: UserId): Promise<Word> {
    return this.wordService.get(wordId, userId);
  }
}
