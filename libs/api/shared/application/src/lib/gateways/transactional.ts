export type Transaction = unknown;

export abstract class Transactional {
  abstract execute(
    callback: (transaction: Transaction) => Promise<void>
  ): Promise<void>;
}
