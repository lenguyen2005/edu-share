import { Injectable } from '@nestjs/common';

import { BasePrismaRepository } from 'src/shared/database/prisma/base-prisma.repository';
import { PrismaDbContext } from 'src/shared/database/prisma/prisma-db-context';

import { PointHistoryMapper } from './mappers/point-history.mapper';
import { PointHistoryEntity } from '../../domain/entities/point-history.entity';
import { IPointHistoryRepository } from '../../domain/interfaces/point-history.repository.interface';

import { GetPointHistoryQuery } from '../../application/dtos/get-point-history.query';

@Injectable()
export class PrismaPointHistoryRepository
  extends BasePrismaRepository
  implements IPointHistoryRepository
{
  constructor(db: PrismaDbContext) {
    super(db);
  }

  async create(entity: PointHistoryEntity): Promise<void> {
    await this.prisma.pointHistory.create({
      data: PointHistoryMapper.toPersistence(entity),
    });
  }

  async findByUserId(
    userId: string,
    query: GetPointHistoryQuery,
  ): Promise<{
    items: PointHistoryEntity[];
    total: number;
  }> {
    const skip = (query.page - 1) * query.limit;

    const [histories, total] = await Promise.all([
      this.prisma.pointHistory.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: query.limit,
      }),

      this.prisma.pointHistory.count({
        where: {
          userId,
        },
      }),
    ]);

    return {
      items: histories.map((history) => PointHistoryMapper.toDomain(history)),
      total,
    };
  }
}
