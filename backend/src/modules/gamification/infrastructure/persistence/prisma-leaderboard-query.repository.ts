import { Injectable } from '@nestjs/common';

import { LeaderboardResponseDto } from '../../application/dtos/leaderboard-response.dto';
import { ILeaderboardQueryRepository } from '../../domain/interfaces/leaderboard-query.repository.interface';

import { PrismaDbContext } from 'src/shared/database/prisma/prisma-db-context';
import { BasePrismaRepository } from 'src/shared/database/prisma/base-prisma.repository';

@Injectable()
export class PrismaLeaderboardQueryRepository
  extends BasePrismaRepository
  implements ILeaderboardQueryRepository
{
  constructor(db: PrismaDbContext) {
    super(db);
  }

  async getLeaderboard(limit = 10): Promise<LeaderboardResponseDto[]> {
    const rankings = await this.prisma.user.findMany({
      take: limit,
      orderBy: [
        {
          level: 'desc',
        },
        {
          exp: 'desc',
        },
      ],
      select: {
        id: true,
        fullName: true,
        level: true,
        exp: true,
      },
    });

    return rankings.map(
      (item) =>
        new LeaderboardResponseDto(
          item.id,
          item.fullName,
          item.level,
          item.exp,
        ),
    );
  }
}
