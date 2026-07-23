import { Inject, Injectable } from '@nestjs/common';

import { PaginatedResultDto } from '../dtos/paginated-result.dto';
import { PointHistoryDto } from '../dtos/point-history.dto';
import { GetPointHistoryQuery } from '../dtos/get-point-history.query';

import { PointHistoryMapper } from '../mappers/point-history.mapper';

import { IPointHistoryRepository } from 'src/modules/gamification/domain/interfaces/point-history.repository.interface';

@Injectable()
export class GetPointHistoryUseCase {
  constructor(
    @Inject('IPointHistoryRepository')
    private readonly pointHistoryRepository: IPointHistoryRepository,
  ) {}

  async execute(
    userId: string,
    query: GetPointHistoryQuery,
  ): Promise<PaginatedResultDto<PointHistoryDto>> {
    const result = await this.pointHistoryRepository.findByUserId(
      userId,
      query,
    );

    return {
      items: result.items.map((item) => PointHistoryMapper.toDto(item)),

      total: result.total,

      page: query.page,

      limit: query.limit,

      totalPages: Math.ceil(result.total / query.limit),
    };
  }
}
