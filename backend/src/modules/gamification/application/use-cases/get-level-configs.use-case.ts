import { Injectable, Inject } from '@nestjs/common';

import { LevelConfigDto } from '../dtos/level-config.dto';
import { LevelConfigMapper } from '../mappers/level-config.mapper';

import { LevelConfigNotFoundException } from 'src/modules/gamification/domain/exceptions/level-config-not-found.exception';
import { ILevelConfigRepository } from 'src/modules/gamification/domain/interfaces/level-config.repository.interface';

@Injectable()
export class GetLevelConfigsUseCase {
  constructor(
    @Inject('ILevelConfigRepository')
    private readonly levelConfigRepository: ILevelConfigRepository,
  ) {}

  async execute(): Promise<LevelConfigDto[]> {
    const levelConfigs = await this.levelConfigRepository.findAll();

    if (levelConfigs.length === 0) {
      throw new LevelConfigNotFoundException();
    }

    return levelConfigs.map((config) => LevelConfigMapper.toDto(config));
  }
}
