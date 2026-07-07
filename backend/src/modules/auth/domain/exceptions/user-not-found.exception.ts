import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class UserNotFoundException extends DomainException {
  constructor() {
    super('User not found.', 'USER_NOT_FOUND', 404);
  }
}
