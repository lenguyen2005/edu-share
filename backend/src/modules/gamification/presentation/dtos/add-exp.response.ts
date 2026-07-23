export class AddExpResponseDto {
  constructor(
    public readonly userId: string,
    public readonly previousLevel: number,
    public readonly currentLevel: number,
    public readonly currentExp: number,
    public readonly leveledUp: boolean,
  ) {}
}
