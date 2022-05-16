import { LearningSession } from './learning-session';
import { SessionDeckNumbers, SessionDecks } from './session-decks';

export class SessionDeck {
  constructor(private readonly numbers: SessionDeckNumbers) {}

  static createBasedOnSession(session: LearningSession): SessionDeck {
    return new SessionDeck(SessionDecks.get(session.toNumber()));
  }

  lastNumberMatchesSessionNumber(session: LearningSession): boolean {
    return this.getLastNumber() === session.toNumber();
  }

  containsSessionNumber(session: LearningSession): boolean {
    return this.numbers.includes(session.toNumber());
  }

  toNumbers(): SessionDeckNumbers {
    return this.numbers;
  }

  private getLastNumber(): number {
    const numbers = this.numbers.slice();

    console.log(this.numbers);
    const lastNumber = numbers.pop();
    console.log(this.numbers);

    if (lastNumber === undefined) {
      throw new Error(`Last number of ${numbers} does not exist`);
    }

    return lastNumber;
  }
}
