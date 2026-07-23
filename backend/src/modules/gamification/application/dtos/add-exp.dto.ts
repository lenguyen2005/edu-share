import { PointReason } from '../../domain/enums/point-reason.enum';

export interface AddExpDto {
  userId: string;

  amount: number;

  reason: PointReason;

  referenceId?: string | null;

  referenceType?: string | null;
}
