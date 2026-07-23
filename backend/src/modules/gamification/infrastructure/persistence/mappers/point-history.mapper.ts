import { PointHistory } from '@prisma/client';

import { PointHistoryEntity } from '../../../domain/entities/point-history.entity';

import { PointReason } from 'src/modules/gamification/domain/enums/point-reason.enum';

export class PointHistoryMapper {
  static toDomain(history: PointHistory): PointHistoryEntity {
    return new PointHistoryEntity({
      id: history.id,
      userId: history.userId,
      amount: history.amount,
      reason: history.reason as PointReason,
      referenceId: history.referenceId,
      referenceType: history.referenceType,
      createdAt: history.createdAt,
    });
  }

  static toPersistence(entity: PointHistoryEntity) {
    return {
      id: entity.id,
      userId: entity.userId,
      amount: entity.amount,
      reason: entity.reason,
      referenceId: entity.referenceId,
      referenceType: entity.referenceType,
      createdAt: entity.createdAt,
    };
  }
}
