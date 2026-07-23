export class LeaderboardResponseDto {
  constructor(
    public readonly rank: number,
    public readonly userId: string,
    public readonly fullName: string,
    public readonly level: number,
    public readonly exp: number,
  ) {}
}
