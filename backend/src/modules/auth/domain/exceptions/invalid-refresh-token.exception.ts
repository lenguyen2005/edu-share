import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class InvalidRefreshTokenException extends DomainException {
  constructor() {
    super(
      'Refresh token không hợp lệ hoặc đã hết hạn',
      'INVALID_REFRESH_TOKEN',
      401,
    );
  }
}
