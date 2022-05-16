import { EntityRepository, Repository } from 'typeorm';
import { WordGroupEntity } from './word-group.entity';

@EntityRepository(WordGroupEntity)
export class WordGroupRepository extends Repository<WordGroupEntity> {
  countWords(wordGroupId: string): Promise<number> {
    return this.createQueryBuilder('wordGroup')
      .select()
      .innerJoin('wordGroup.words', 'word')
      .where('wordGroup.id = :id', { id: wordGroupId })
      .getCount();
  }
}
