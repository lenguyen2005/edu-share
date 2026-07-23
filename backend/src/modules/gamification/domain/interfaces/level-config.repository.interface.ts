import { LevelConfigEntity } from '../entities/level-config.entity';

export interface ILevelConfigRepository {
  findAll(): Promise<LevelConfigEntity[]>;
  createIfNotExists(entity: LevelConfigEntity): Promise<void>;
}
