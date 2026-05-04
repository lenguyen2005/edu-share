import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class InvalidPasswordException extends DomainException {
  constructor(message = 'Mật khẩu không hợp lệ') {
    super(message, 'INVALID_PASSWORD');
  }
}
