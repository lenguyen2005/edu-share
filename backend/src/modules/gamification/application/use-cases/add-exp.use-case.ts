import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { AddExpDto } from '../dtos/add-exp.dto';
import { AddExpResultDto } from '../dtos/add-exp-result.dto';

import { PointHistoryEntity } from 'src/modules/gamification/domain/entities/point-history.entity';

import { GamificationNotFoundException } from 'src/modules/gamification/domain/exceptions/gamification-not-found.exception';
import { LevelConfigNotFoundException } from 'src/modules/gamification/domain/exceptions/level-config-not-found.exception';

import { IGamificationRepository } from 'src/modules/gamification/domain/interfaces/gamification.repository.interface';
import { ILevelConfigRepository } from 'src/modules/gamification/domain/interfaces/level-config.repository.interface';
import { IPointHistoryRepository } from 'src/modules/gamification/domain/interfaces/point-history.repository.interface';

@Injectable()
export class AddExpUseCase {
  constructor(
    @Inject('IGamificationRepository')
    private readonly gamificationRepository: IGamificationRepository,
    @Inject('ILevelConfigRepository')
    private readonly levelConfigRepository: ILevelConfigRepository,
    @Inject('IPointHistoryRepository')
    private readonly pointHistoryRepository: IPointHistoryRepository,
  ) {}

  async execute(dto: AddExpDto): Promise<AddExpResultDto> {
    const gamification = await this.gamificationRepository.findByUserId(
      dto.userId,
    );

    if (!gamification) {
      throw new GamificationNotFoundException(dto.userId);
    }

    const levelConfigs = await this.levelConfigRepository.findAll();

    if (levelConfigs.length === 0) {
      throw new LevelConfigNotFoundException();
    }

    const levelResult = gamification.addExp(dto.amount, levelConfigs);

    await this.gamificationRepository.save(gamification);

    const history = new PointHistoryEntity({
      id: uuid(),

      userId: dto.userId,

      amount: dto.amount,

      reason: dto.reason,

      referenceId: dto.referenceId,

      referenceType: dto.referenceType,
    });

    await this.pointHistoryRepository.create(history);

    return {
      userId: gamification.userId,

      previousLevel: levelResult.oldLevel,

      currentLevel: levelResult.newLevel,

      currentExp: gamification.exp,

      leveledUp: levelResult.leveledUp,
    };
  }
}
