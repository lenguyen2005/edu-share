import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AsyncLocalStorage } from 'node:async_hooks';

@Injectable()
export class PrismaTransactionContext {
  private readonly storage = new AsyncLocalStorage<Prisma.TransactionClient>();

  getTransaction(): Prisma.TransactionClient | undefined {
    return this.storage.getStore();
  }

  run<T>(
    transaction: Prisma.TransactionClient,
    callback: () => Promise<T>,
  ): Promise<T> {
    return this.storage.run(transaction, callback);
  }

  get isInTransaction(): boolean {
    return this.storage.getStore() !== undefined;
  }
}
