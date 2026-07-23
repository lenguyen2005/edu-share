import { PointHistoryEntity } from '../entities/point-history.entity';
import { GetPointHistoryQuery } from '../../application/dtos/get-point-history.query';

export interface IPointHistoryRepository {
  create(history: PointHistoryEntity): Promise<void>;

  findByUserId(
    userId: string,
    query: GetPointHistoryQuery,
  ): Promise<{
    items: PointHistoryEntity[];
    total: number;
  }>;
}
