import { LeaderboardResponseDto as LeaderboardDto } from '../../application/dtos/leaderboard-response.dto';
import { LeaderboardResponseDto } from '../dtos/leaderboard.response';

export class LeaderboardMapper {
  static toResponse(leaderboard: LeaderboardDto[]): LeaderboardResponseDto[] {
    return leaderboard.map(
      (item, index) =>
        new LeaderboardResponseDto(
          index + 1,
          item.userId,
          item.fullName,
          item.level,
          item.exp,
        ),
    );
  }
}
