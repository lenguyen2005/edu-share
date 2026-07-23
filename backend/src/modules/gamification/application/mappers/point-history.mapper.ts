import { PointHistoryDto } from '../dtos/point-history.dto';
import { PointHistoryEntity } from '../../domain/entities/point-history.entity';

export class PointHistoryMapper {
  static toDto(entity: PointHistoryEntity): PointHistoryDto {
    return {
      id: entity.id,
      amount: entity.amount,
      reason: entity.reason,
      referenceId: entity.referenceId,
      referenceType: entity.referenceType,
      createdAt: entity.createdAt,
    };
  }
}
