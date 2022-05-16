import { Injectable } from '@nestjs/common';
import { Transaction, Transactional } from '@voclearn/api/shared/application';
import { Connection } from 'typeorm';

@Injectable()
export class TypeormTransactional implements Transactional {
  constructor(private readonly connection: Connection) {}

  async execute(
    callback: (transaction: Transaction) => Promise<void>
  ): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      await callback(queryRunner);

      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
