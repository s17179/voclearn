import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('learners')
export class LearnerEntity {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  currentSession: number;

  @Column()
  partitionSize: number;

  constructor(id: string, currentSession: number, partitionSize: number) {
    this.id = id;
    this.currentSession = currentSession;
    this.partitionSize = partitionSize;
  }
}
