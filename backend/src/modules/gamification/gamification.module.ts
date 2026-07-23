import { Module } from '@nestjs/common';

import { GamificationController } from './presentation/controllers/gamification.controller';

import { AddExpUseCase } from './application/use-cases/add-exp.use-case';
import { GetLeaderboardUseCase } from './application/use-cases/get-leaderboard.use-case';
import { GetLevelConfigsUseCase } from './application/use-cases/get-level-configs.use-case';
import { GetPointHistoryUseCase } from './application/use-cases/get-point-history.use-case';
import { GetUserGamificationUseCase } from './application/use-cases/get-user-gamification.use-case';

import { PrismaGamificationRepository } from './infrastructure/persistence/prisma-gamification.repository';
import { PrismaLeaderboardQueryRepository } from './infrastructure/persistence/prisma-leaderboard-query.repository';
import { PrismaLevelConfigRepository } from './infrastructure/persistence/prisma-level-config.repository';
import { PrismaPointHistoryRepository } from './infrastructure/persistence/prisma-point-history.repository';
import { DocumentUploadedHandler } from './application/event-handlers/document-uploaded.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [GamificationController],

  providers: [
    AddExpUseCase,
    GetLeaderboardUseCase,
    GetLevelConfigsUseCase,
    GetPointHistoryUseCase,
    GetUserGamificationUseCase,

    {
      provide: 'IGamificationRepository',
      useClass: PrismaGamificationRepository,
    },
    {
      provide: 'ILeaderboardQueryRepository',
      useClass: PrismaLeaderboardQueryRepository,
    },
    {
      provide: 'ILevelConfigRepository',
      useClass: PrismaLevelConfigRepository,
    },
    {
      provide: 'IPointHistoryRepository',
      useClass: PrismaPointHistoryRepository,
    },
    DocumentUploadedHandler,
  ],

  exports: [
    AddExpUseCase,
    GetLeaderboardUseCase,
    GetLevelConfigsUseCase,
    GetPointHistoryUseCase,
    GetUserGamificationUseCase,

    'ILevelConfigRepository',
  ],
})
export class GamificationModule {}
