import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaTransactionContext } from './prisma-transaction-context';
import { PrismaDbContext } from './prisma-db-context';
import { PrismaUnitOfWork } from './prisma-unit-of-work';

@Global()
@Module({
  providers: [
    PrismaService,
    PrismaTransactionContext,
    PrismaDbContext,
    PrismaUnitOfWork,
  ],
  exports: [PrismaService, PrismaDbContext, PrismaUnitOfWork],
})
export class PrismaModule {}
