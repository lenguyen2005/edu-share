import { Inject, Injectable } from '@nestjs/common';

import { UserGamificationDto } from '../dtos/user-gamification.dto';

import { GamificationNotFoundException } from 'src/modules/gamification/domain/exceptions/gamification-not-found.exception';
import { LevelConfigNotFoundException } from 'src/modules/gamification/domain/exceptions/level-config-not-found.exception';

import { IGamificationRepository } from 'src/modules/gamification/domain/interfaces/gamification.repository.interface';
import { ILevelConfigRepository } from 'src/modules/gamification/domain/interfaces/level-config.repository.interface';

@Injectable()
export class GetUserGamificationUseCase {
  constructor(
    @Inject('IGamificationRepository')
    private readonly gamificationRepository: IGamificationRepository,
    @Inject('ILevelConfigRepository')
    private readonly levelConfigRepository: ILevelConfigRepository,
  ) {}

  async execute(userId: string): Promise<UserGamificationDto> {
    const gamification = await this.gamificationRepository.findByUserId(userId);

    if (!gamification) {
      throw new GamificationNotFoundException(userId);
    }

    const levelConfigs = await this.levelConfigRepository.findAll();

    if (levelConfigs.length === 0) {
      throw new LevelConfigNotFoundException();
    }

    const currentLevel = gamification.getCurrentLevelConfig(levelConfigs);

    return {
      userId: gamification.userId,
      exp: gamification.exp,
      level: gamification.level,
      title: currentLevel.title,
      expToNextLevel: gamification.getExpToNextLevel(levelConfigs),
      isMaxLevel: gamification.isMaxLevel(levelConfigs),
    };
  }
}
