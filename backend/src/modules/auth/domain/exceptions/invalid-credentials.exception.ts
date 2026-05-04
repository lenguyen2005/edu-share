import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class InvalidCredentialsException extends DomainException {
  constructor(message = 'Email hoặc mật khẩu không chính xác') {
    super(message, 'INVALID_CREDENTIALS', 401);
  }
}
