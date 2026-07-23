import { Injectable } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { PrismaTransactionContext } from './prisma-transaction-context';
import { IUnitOfWork } from './unit-of-work.interface';

@Injectable()
export class PrismaUnitOfWork implements IUnitOfWork {
  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionContext: PrismaTransactionContext,
  ) {}

  async runInTransaction<T>(work: () => Promise<T>): Promise<T> {
    if (this.transactionContext.isInTransaction) {
      return work();
    }

    return this.prisma.$transaction(async (transaction) => {
      return this.transactionContext.run(transaction, work);
    });
  }
}
