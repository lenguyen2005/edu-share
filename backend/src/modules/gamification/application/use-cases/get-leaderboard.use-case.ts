import { Inject, Injectable } from '@nestjs/common';

import { LeaderboardResponseDto } from '../dtos/leaderboard-response.dto';

import { ILeaderboardQueryRepository } from '../../domain/interfaces/leaderboard-query.repository.interface';

@Injectable()
export class GetLeaderboardUseCase {
  constructor(
    @Inject('ILeaderboardQueryRepository')
    private readonly leaderboardQueryRepository: ILeaderboardQueryRepository,
  ) {}

  async execute(limit = 10): Promise<LeaderboardResponseDto[]> {
    return this.leaderboardQueryRepository.getLeaderboard(limit);
  }
}
