import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class GamificationNotFoundException extends DomainException {
  constructor(userId: string) {
    super(
      `Không tìm thấy thông tin gamification của người dùng ${userId}.`,
      'GAMIFICATION_NOT_FOUND',
      404,
    );
  }
}
