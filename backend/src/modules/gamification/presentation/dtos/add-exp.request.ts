import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { PointReason } from '../../domain/enums/point-reason.enum';

export class AddExpRequestDto {
  @IsUUID()
  userId: string;

  @IsInt()
  @Min(1)
  amount: number;

  @IsEnum(PointReason)
  reason: PointReason;

  @IsOptional()
  @IsString()
  referenceId?: string;

  @IsOptional()
  @IsString()
  referenceType?: string;
}
