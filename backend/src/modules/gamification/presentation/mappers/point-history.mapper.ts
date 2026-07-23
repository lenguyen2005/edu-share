import { PaginatedResultDto } from '../../application/dtos/paginated-result.dto';
import { PointHistoryDto } from '../../application/dtos/point-history.dto';

import {
  PaginatedPointHistoryResponseDto,
  PointHistoryResponseDto,
} from '../dtos/point-history.response';

export class PointHistoryMapper {
  static toResponse(
    dto: PaginatedResultDto<PointHistoryDto>,
  ): PaginatedPointHistoryResponseDto {
    return new PaginatedPointHistoryResponseDto(
      dto.items.map(
        (item) =>
          new PointHistoryResponseDto(
            item.id,
            item.amount,
            item.reason,
            item.referenceId,
            item.referenceType,
            item.createdAt,
          ),
      ),
      dto.total,
      dto.page,
      dto.limit,
      dto.totalPages,
    );
  }
}
