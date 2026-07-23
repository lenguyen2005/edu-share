import { User } from '@prisma/client';

import { UserGamificationEntity } from '../../../domain/entities/user-gamification.entity';

export class UserGamificationMapper {
  static toDomain(user: User): UserGamificationEntity {
    return new UserGamificationEntity({
      userId: user.id,
      exp: user.exp,
      level: user.level,
    });
  }

  static toPersistence(entity: UserGamificationEntity) {
    return {
      exp: entity.exp,
      level: entity.level,
    };
  }
}
