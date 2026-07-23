export class GamificationResponseDto {
  constructor(
    public readonly userId: string,
    public readonly exp: number,
    public readonly level: number,
    public readonly title: string,
    public readonly expToNextLevel: number | null,
    public readonly isMaxLevel: boolean,
  ) {}
}
