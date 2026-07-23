import { LeaderboardResponseDto } from '../../application/dtos/leaderboard-response.dto';

export interface ILeaderboardQueryRepository {
  getLeaderboard(limit?: number): Promise<LeaderboardResponseDto[]>;
}
