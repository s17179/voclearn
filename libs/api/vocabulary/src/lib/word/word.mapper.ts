import { Injectable } from '@nestjs/common';
import { Word } from './dto/word';
import { WordEntity } from './word.entity';
import { AssociationMapper } from '../association/association.mapper';
import { WordGroupMapper } from '../word-group/word-group.mapper';

@Injectable()
export class WordMapper {
  constructor(
    private readonly associationMapper: AssociationMapper,
    private readonly wordGroupMapper: WordGroupMapper
  ) {}

  map(entity: WordEntity): Word {
    const association = this.associationMapper.map(entity.association);

    const wordGroup = this.wordGroupMapper.map(entity.wordGroup);

    return new Word(
      entity.id,
      entity.value,
      entity.translation,
      association,
      wordGroup
    );
  }

  mapMany(entities: WordEntity[]): Word[] {
    return entities.map((entity) => this.map(entity));
  }
}
