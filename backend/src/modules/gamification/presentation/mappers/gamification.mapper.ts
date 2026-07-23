import { UserGamificationDto } from '../../application/dtos/user-gamification.dto';
import { GamificationResponseDto } from '../dtos/gamification.response';

export class GamificationMapper {
  static toResponse(dto: UserGamificationDto): GamificationResponseDto {
    return new GamificationResponseDto(
      dto.userId,
      dto.exp,
      dto.level,
      dto.title,
      dto.expToNextLevel,
      dto.isMaxLevel,
    );
  }
}
