import { PointReason } from '../../domain/enums/point-reason.enum';

export interface PointHistoryDto {
  id: string;
  amount: number;
  reason: PointReason;
  referenceId: string | null;
  referenceType: string | null;
  createdAt: Date;
}
