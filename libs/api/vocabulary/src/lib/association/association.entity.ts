import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { WordEntity } from '../word/word.entity';

@Entity('associations')
export class AssociationEntity {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column({ length: 255 })
  note: string;

  @OneToOne(() => WordEntity, (word) => word.association)
  word: WordEntity;

  constructor(id: string, note: string, word: WordEntity) {
    this.id = id;
    this.note = note;
    this.word = word;
  }
}
