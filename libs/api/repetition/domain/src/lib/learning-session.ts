export class LearningSession {
  private static FIRST_SESSION_NUMBER = 0;
  static LAST_SESSION_NUMBER = 9;

  constructor(private readonly sessionNumber: number) {
    this.assertSessionNumberIsInRange();
  }

  static start(): LearningSession {
    return new LearningSession(LearningSession.FIRST_SESSION_NUMBER);
  }

  toNumber(): number {
    return this.sessionNumber;
  }

  next(): LearningSession {
    let nextSessionNumber: number;

    if (this.sessionNumber === LearningSession.LAST_SESSION_NUMBER) {
      nextSessionNumber = LearningSession.FIRST_SESSION_NUMBER;
    } else {
      nextSessionNumber = this.sessionNumber + 1;
    }

    return new LearningSession(nextSessionNumber);
  }

  equals(session: LearningSession): boolean {
    return this.sessionNumber === session.toNumber();
  }

  private assertSessionNumberIsInRange(): void {
    if (
      this.sessionNumber < LearningSession.FIRST_SESSION_NUMBER ||
      this.sessionNumber > LearningSession.LAST_SESSION_NUMBER
    ) {
      throw new Error(
        `Session number ${this.sessionNumber} must be in range from 0 to 9`
      );
    }
  }
}
