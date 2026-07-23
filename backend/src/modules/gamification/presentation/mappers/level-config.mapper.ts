import { LevelConfigDto } from '../../application/dtos/level-config.dto';
import { LevelConfigResponseDto } from '../dtos/level-config.response';

export class LevelConfigMapper {
  static toResponse(configs: LevelConfigDto[]): LevelConfigResponseDto[] {
    return configs.map(
      (config) =>
        new LevelConfigResponseDto(config.level, config.minExp, config.title),
    );
  }
}
