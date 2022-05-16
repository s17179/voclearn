export type SessionNumber = number;
export type SessionDeckNumbers = number[];

export class SessionDecks {
  private static readonly map = new Map<SessionNumber, SessionDeckNumbers>([
    [0, [0, 2, 5, 9]],
    [1, [1, 3, 6, 0]],
    [2, [2, 4, 7, 1]],
    [3, [3, 5, 8, 2]],
    [4, [4, 6, 9, 3]],
    [5, [5, 7, 0, 4]],
    [6, [6, 8, 1, 5]],
    [7, [7, 9, 2, 6]],
    [8, [8, 0, 3, 7]],
    [9, [9, 1, 4, 8]],
  ]);

  static get(sessionNumber: SessionNumber): SessionDeckNumbers {
    const sessionDeckNumbers = SessionDecks.map.get(sessionNumber);

    if (sessionDeckNumbers === undefined) {
      throw new Error(
        `Session deck for session ${sessionNumber} does not exist`
      );
    }

    return sessionDeckNumbers;
  }
}
