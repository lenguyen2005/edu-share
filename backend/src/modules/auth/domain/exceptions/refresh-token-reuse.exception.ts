import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class RefreshTokenReuseDetectedException extends DomainException {
  constructor() {
    super(
      'Cảnh báo bảo mật: Token đã được sử dụng hoặc bị đánh cắp',
      'REFRESH_TOKEN_REUSE_DETECTED',
      401,
    );
  }
}
