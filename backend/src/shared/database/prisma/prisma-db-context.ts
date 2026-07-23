import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

import { PrismaService } from './prisma.service';
import { PrismaTransactionContext } from './prisma-transaction-context';

@Injectable()
export class PrismaDbContext {
  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionContext: PrismaTransactionContext,
  ) {}

  get client(): PrismaClient | Prisma.TransactionClient {
    return this.transactionContext.getTransaction() ?? this.prisma;
  }
}
