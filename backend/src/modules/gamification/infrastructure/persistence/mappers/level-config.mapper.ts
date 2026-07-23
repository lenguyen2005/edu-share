import { LevelConfig } from '@prisma/client';

import { LevelConfigEntity } from '../../../domain/entities/level-config.entity';

export class LevelConfigMapper {
  static toDomain(level: LevelConfig): LevelConfigEntity {
    return new LevelConfigEntity({
      level: level.level,
      minExp: level.minExp,
      title: level.title,
    });
  }

  static toPersistence(entity: LevelConfigEntity) {
    return {
      level: entity.level,
      minExp: entity.minExp,
      title: entity.title,
    };
  }
}
