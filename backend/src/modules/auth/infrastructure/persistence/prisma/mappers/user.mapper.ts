import { User } from '@prisma/client';
import { Role as PrismaRole } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { Role } from 'src/modules/auth/domain/enum/role.enum';
import { UserEntity } from 'src/modules/auth/domain/entities/user.entity';
import { Email } from 'src/modules/auth/domain/value-objects/email.vo';
import { Password } from 'src/modules/auth/domain/value-objects/password.vo';

export class UserMapper {
  static toEntity(prismaUser: User): UserEntity {
    return new UserEntity(
      prismaUser.id,
      new Email(prismaUser.email),
      new Password(prismaUser.password),
      prismaUser.fullName,
      this.toDomainRole(prismaUser.role),
      prismaUser.exp,
      prismaUser.level,
      prismaUser.createdAt,
      prismaUser.updatedAt,
      prismaUser.refreshToken,
    );
  }

  static toPrisma(user: UserEntity): Prisma.UserCreateInput {
    return {
      id: user.id,
      email: user.getEmail().getValue(),
      password: user.getPasswordHash(),
      fullName: user.getFullName(),
      role: user.getRole() as PrismaRole,
      exp: user.getExp(),
      level: user.getLevel(),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      refreshToken: user.getRefreshToken(),
    };
  }

  private static toDomainRole(role: PrismaRole): Role {
    return Role[role];
  }
}
