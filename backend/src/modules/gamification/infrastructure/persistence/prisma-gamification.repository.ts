import { Injectable } from '@nestjs/common';

import { BasePrismaRepository } from 'src/shared/database/prisma/base-prisma.repository';
import { PrismaDbContext } from 'src/shared/database/prisma/prisma-db-context';

import { UserGamificationMapper } from './mappers/user-gamification.mapper';

import { UserGamificationEntity } from '../../domain/entities/user-gamification.entity';
import { IGamificationRepository } from '../../domain/interfaces/gamification.repository.interface';

@Injectable()
export class PrismaGamificationRepository
  extends BasePrismaRepository
  implements IGamificationRepository
{
  constructor(db: PrismaDbContext) {
    super(db);
  }

  async findByUserId(userId: string): Promise<UserGamificationEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return null;
    }

    return UserGamificationMapper.toDomain(user);
  }

  async save(entity: UserGamificationEntity): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: entity.userId,
      },
      data: UserGamificationMapper.toPersistence(entity),
    });
  }
}
