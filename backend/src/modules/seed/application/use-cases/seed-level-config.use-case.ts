import { Inject, Injectable } from '@nestjs/common';

import { ILevelConfigRepository } from 'src/modules/gamification/domain/interfaces/level-config.repository.interface';
import { LevelConfigEntity } from 'src/modules/gamification/domain/entities/level-config.entity';

@Injectable()
export class SeedLevelConfigUseCase {
  constructor(
    @Inject('ILevelConfigRepository')
    private readonly repository: ILevelConfigRepository,
  ) {}

  async execute(): Promise<void> {
    const configs = [
      new LevelConfigEntity({
        level: 1,
        minExp: 0,
        title: 'Beginner',
      }),
      new LevelConfigEntity({
        level: 2,
        minExp: 100,
        title: 'Novice',
      }),
      new LevelConfigEntity({
        level: 3,
        minExp: 300,
        title: 'Intermediate',
      }),
      new LevelConfigEntity({
        level: 4,
        minExp: 600,
        title: 'Advanced',
      }),
      new LevelConfigEntity({
        level: 5,
        minExp: 1000,
        title: 'Expert',
      }),
    ];

    for (const config of configs) {
      await this.repository.createIfNotExists(config);
    }
  }
}
