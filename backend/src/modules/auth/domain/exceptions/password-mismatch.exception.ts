import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class PasswordMismatchException extends DomainException {
  constructor(message = 'Password không khớp') {
    super(message, 'PASSWORD_MISMATCH');
  }
}
