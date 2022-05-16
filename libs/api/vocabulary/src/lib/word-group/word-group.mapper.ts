import { Injectable } from '@nestjs/common';
import { WordGroupEntity } from './word-group.entity';
import { WordGroup } from './dto/word-group';
import { UserId } from '@voclearn/api/shared/domain';

@Injectable()
export class WordGroupMapper {
  map(entity: WordGroupEntity): WordGroup {
    return new WordGroup(entity.id, entity.name);
  }

  mapMany(entities: WordGroupEntity[]): WordGroup[] {
    return entities.map((entity) => this.map(entity));
  }

  mapToEntity(wordGroup: WordGroup, userId: UserId): WordGroupEntity {
    return new WordGroupEntity(wordGroup.id, wordGroup.name, [], userId);
  }
}
