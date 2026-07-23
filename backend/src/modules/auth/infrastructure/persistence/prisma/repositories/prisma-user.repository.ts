import { BasePrismaRepository } from 'src/shared/database/prisma/base-prisma.repository';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/modules/auth/domain/interfaces/user.repository.interface';
import { UserEntity } from 'src/modules/auth/domain/entities/user.entity';
import { PrismaDbContext } from 'src/shared/database/prisma/prisma-db-context';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class PrismaUserRepository
  extends BasePrismaRepository
  implements IUserRepository
{
  constructor(db: PrismaDbContext) {
    super(db);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return UserMapper.toEntity(user);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return UserMapper.toEntity(user);
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const created = await this.prisma.user.create({
      data: UserMapper.toPrisma(user),
    });

    return UserMapper.toEntity(created);
  }

  async updateRefreshToken(
    userId: string,
    token: string | null,
  ): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: token },
    });
  }
}
