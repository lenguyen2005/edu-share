import { AddExpResultDto } from '../../application/dtos/add-exp-result.dto';
import { AddExpResponseDto } from '../dtos/add-exp.response';

export class AddExpMapper {
  static toResponse(dto: AddExpResultDto): AddExpResponseDto {
    return new AddExpResponseDto(
      dto.userId,
      dto.previousLevel,
      dto.currentLevel,
      dto.currentExp,
      dto.leveledUp,
    );
  }
}
