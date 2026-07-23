import { PointReason } from '../../domain/enums/point-reason.enum';

export class PointHistoryResponseDto {
  constructor(
    public readonly id: string,
    public readonly amount: number,
    public readonly reason: PointReason,
    public readonly referenceId: string | null,
    public readonly referenceType: string | null,
    public readonly createdAt: Date,
  ) {}
}

export class PaginatedPointHistoryResponseDto {
  constructor(
    public readonly items: PointHistoryResponseDto[],
    public readonly total: number,
    public readonly page: number,
    public readonly limit: number,
    public readonly totalPages: number,
  ) {}
}
