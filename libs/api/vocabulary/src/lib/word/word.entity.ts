import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { WordGroupEntity } from '../word-group/word-group.entity';
import { AssociationEntity } from '../association/association.entity';

@Entity('words')
export class WordEntity {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column({ length: 255 })
  value: string;

  @Column({ length: 255 })
  translation: string;

  @ManyToOne(() => WordGroupEntity, (wordGroup) => wordGroup.words, {
    nullable: false,
  })
  wordGroup: WordGroupEntity;

  @OneToOne(() => AssociationEntity, (association) => association.word, {
    nullable: false,
  })
  @JoinColumn()
  association!: AssociationEntity;

  @Column()
  userId: string;

  constructor(
    id: string,
    value: string,
    translation: string,
    wordGroup: WordGroupEntity,
    userId: string
  ) {
    this.id = id;
    this.value = value;
    this.translation = translation;
    this.wordGroup = wordGroup;
    this.userId = userId;
  }
}
