import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import {
  RetiredDeckCard,
  SessionDeckCard,
} from '@voclearn/api-repetition-domain';
import { LearnerEntity } from './learner.entity';

@Entity('cards')
export class CardEntity {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  type: string;

  @ManyToOne(() => LearnerEntity)
  learner: LearnerEntity;

  @Column({ type: 'int', array: true, nullable: true })
  sessionDeckNumbers: number[] | null;

  @Column({ type: 'int', nullable: true })
  retiredInSession: number | null;

  constructor(
    id: string,
    type: string,
    learner: LearnerEntity,
    sessionDeckNumbers: number[] | null,
    retiredInSession: number | null
  ) {
    this.id = id;
    this.type = type;
    this.learner = learner;
    this.sessionDeckNumbers = sessionDeckNumbers;
    this.retiredInSession = retiredInSession;

    this.assertSessionDeckNumberArePassedIfCardTypeIsSessionDeckCard();
    this.assertRetiredInSessionIsPassedIfCardTypeIsRetiredDeckCard();
  }

  private assertSessionDeckNumberArePassedIfCardTypeIsSessionDeckCard(): void {
    if (
      this.type === SessionDeckCard.name &&
      this.sessionDeckNumbers === null
    ) {
      throw new Error(
        `Session deck numbers must be passed if card type is ${SessionDeckCard.name}`
      );
    }
  }

  private assertRetiredInSessionIsPassedIfCardTypeIsRetiredDeckCard(): void {
    if (this.type === RetiredDeckCard.name && this.retiredInSession === null) {
      throw new Error(
        `Retired in session must be passed if card type is ${RetiredDeckCard.name}`
      );
    }
  }
}
