import { LevelConfigEntity } from '../../domain/entities/level-config.entity';
import { LevelConfigDto } from '../dtos/level-config.dto';

export class LevelConfigMapper {
  static toDto(entity: LevelConfigEntity): LevelConfigDto {
    return {
      level: entity.level,
      minExp: entity.minExp,
      title: entity.title,
    };
  }
}
