export class LevelConfigResponseDto {
  constructor(
    public readonly level: number,
    public readonly minExp: number,
    public readonly title: string,
  ) {}
}
