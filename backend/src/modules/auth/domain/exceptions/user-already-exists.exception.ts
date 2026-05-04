import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class UserAlreadyExistsException extends DomainException {
  constructor(message = 'User đã tồn tại') {
    super(message, 'USER_ALREADY_EXISTS', 409);
  }
}
