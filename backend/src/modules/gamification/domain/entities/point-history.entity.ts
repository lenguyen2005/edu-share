import { PointReason } from '../enums/point-reason.enum';
import { PointAmountZeroException } from '../exceptions/point-amount-zero.exception';

export interface PointHistoryProps {
  id: string;
  userId: string;
  amount: number;
  reason: PointReason;
  referenceId?: string | null;
  referenceType?: string | null;
  createdAt?: Date;
}

export class PointHistoryEntity {
  readonly id: string;
  readonly userId: string;
  readonly amount: number;
  readonly reason: PointReason;
  readonly referenceId: string | null;
  readonly referenceType: string | null;
  readonly createdAt: Date;

  constructor(props: PointHistoryProps) {
    if (props.amount === 0) {
      throw new PointAmountZeroException();
    }

    this.id = props.id;
    this.userId = props.userId;
    this.amount = props.amount;
    this.reason = props.reason;
    this.referenceId = props.referenceId ?? null;
    this.referenceType = props.referenceType ?? null;
    this.createdAt = props.createdAt ?? new Date();
  }

  get isReward(): boolean {
    return this.amount > 0;
  }

  get isPenalty(): boolean {
    return this.amount < 0;
  }
}
