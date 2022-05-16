import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { WordEntity } from '../word/word.entity';

@Entity('word_groups')
export class WordGroupEntity {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column({ length: 255 })
  name: string;

  @OneToMany(() => WordEntity, (word) => word.wordGroup)
  words: WordEntity[];

  @Column()
  userId: string;

  constructor(id: string, name: string, words: WordEntity[], userId: string) {
    this.id = id;
    this.name = name;
    this.words = words;
    this.userId = userId;
  }
}
