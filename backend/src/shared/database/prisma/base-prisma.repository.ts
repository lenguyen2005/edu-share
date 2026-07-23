import { Prisma, PrismaClient } from '@prisma/client';

import { PrismaDbContext } from './prisma-db-context';

export abstract class BasePrismaRepository {
  protected constructor(protected readonly db: PrismaDbContext) {}

  protected get prisma(): PrismaClient | Prisma.TransactionClient {
    return this.db.client;
  }
}
