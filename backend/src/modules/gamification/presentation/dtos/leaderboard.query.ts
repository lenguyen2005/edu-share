import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class LeaderboardQueryDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  limit = 10;
}
