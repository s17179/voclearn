import { Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CardEntity } from './card.entity';
import { LearnerEntity } from './learner.entity';

@Entity('partitions')
@Index(['card', 'learner'], { unique: true })
export class PartitionEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @ManyToOne(() => CardEntity)
  readonly card: CardEntity;

  @ManyToOne(() => LearnerEntity)
  readonly learner: LearnerEntity;

  constructor(card: CardEntity, learner: LearnerEntity) {
    this.card = card;
    this.learner = learner;
  }
}
