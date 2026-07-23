import { Injectable } from '@nestjs/common';

import { BasePrismaRepository } from 'src/shared/database/prisma/base-prisma.repository';
import { PrismaDbContext } from 'src/shared/database/prisma/prisma-db-context';

import { LevelConfigMapper } from './mappers/level-config.mapper';

import { ILevelConfigRepository } from '../../domain/interfaces/level-config.repository.interface';
import { LevelConfigEntity } from '../../domain/entities/level-config.entity';

@Injectable()
export class PrismaLevelConfigRepository
  extends BasePrismaRepository
  implements ILevelConfigRepository
{
  constructor(db: PrismaDbContext) {
    super(db);
  }

  async findAll(): Promise<LevelConfigEntity[]> {
    const configs = await this.prisma.levelConfig.findMany({
      orderBy: {
        level: 'asc',
      },
    });

    return configs.map((config) => LevelConfigMapper.toDomain(config));
  }

  async createIfNotExists(entity: LevelConfigEntity): Promise<void> {
    const exists = await this.prisma.levelConfig.findUnique({
      where: {
        level: entity.level,
      },
    });

    if (exists) {
      return;
    }

    await this.prisma.levelConfig.create({
      data: {
        level: entity.level,
        minExp: entity.minExp,
        title: entity.title,
      },
    });
  }
}
