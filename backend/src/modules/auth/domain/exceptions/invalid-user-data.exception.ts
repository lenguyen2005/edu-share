import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class InvalidUserDataException extends DomainException {
  constructor(field: string) {
    super(`${field} không hợp lệ`, 'INVALID_USER_DATA', 400);
  }
}
