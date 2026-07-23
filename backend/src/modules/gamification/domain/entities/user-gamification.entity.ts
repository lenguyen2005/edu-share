import { ExperienceCannotBeNegativeException } from '../exceptions/experience-cannot-be-negative.exception';
import { ExperienceMustBePositiveException } from '../exceptions/experience-must-be-positive.exception';
import { LevelConfigNotFoundException } from '../exceptions/level-config-not-found.exception';
import { LevelMustBePositiveException } from '../exceptions/level-must-be-positive.exception';
import { LevelConfigEntity } from './level-config.entity';

export interface UserGamificationProps {
  userId: string;
  exp: number;
  level: number;
}

export interface LevelUpResult {
  oldLevel: number;
  newLevel: number;
  leveledUp: boolean;
}

export class UserGamificationEntity {
  readonly userId: string;

  private _exp: number;

  private _level: number;

  constructor(props: UserGamificationProps) {
    if (props.exp < 0) {
      throw new ExperienceCannotBeNegativeException();
    }

    if (props.level < 1) {
      throw new LevelMustBePositiveException();
    }

    this.userId = props.userId;
    this._exp = props.exp;
    this._level = props.level;
  }

  get exp(): number {
    return this._exp;
  }

  get level(): number {
    return this._level;
  }

  public addExp(
    amount: number,
    levelConfigs: LevelConfigEntity[],
  ): LevelUpResult {
    if (amount <= 0) {
      throw new ExperienceMustBePositiveException();
    }

    const oldLevel = this._level;

    this._exp += amount;

    this.evaluateLevel(levelConfigs);

    return {
      oldLevel,
      newLevel: this._level,
      leveledUp: this._level > oldLevel,
    };
  }

  public removeExp(
    amount: number,
    levelConfigs: LevelConfigEntity[],
  ): LevelUpResult {
    if (amount <= 0) {
      throw new ExperienceMustBePositiveException();
    }

    const oldLevel = this._level;

    this._exp = Math.max(0, this._exp - amount);

    this.evaluateLevel(levelConfigs);

    return {
      oldLevel,
      newLevel: this._level,
      leveledUp: this._level > oldLevel,
    };
  }

  /**
   * Repository phải trả levelConfigs theo thứ tự level tăng dần.
   */
  private evaluateLevel(levelConfigs: LevelConfigEntity[]): void {
    let newLevel = 1;

    for (const config of levelConfigs) {
      if (this._exp >= config.minExp) {
        newLevel = config.level;
      } else {
        break;
      }
    }

    this._level = newLevel;
  }

  public getNextLevelConfig(
    levelConfigs: LevelConfigEntity[],
  ): LevelConfigEntity | null {
    return (
      levelConfigs.find((config) => config.level === this._level + 1) ?? null
    );
  }

  public getExpToNextLevel(levelConfigs: LevelConfigEntity[]): number | null {
    const nextLevel = this.getNextLevelConfig(levelConfigs);

    if (!nextLevel) {
      return null;
    }

    return Math.max(0, nextLevel.minExp - this._exp);
  }

  public isMaxLevel(levelConfigs: LevelConfigEntity[]): boolean {
    const nextLevel = this.getNextLevelConfig(levelConfigs);

    return nextLevel === null;
  }

  public getCurrentLevelConfig(
    configs: LevelConfigEntity[],
  ): LevelConfigEntity {
    const config = configs.find((x) => x.level === this._level);

    if (!config) {
      throw new LevelConfigNotFoundException();
    }

    return config;
  }
}
