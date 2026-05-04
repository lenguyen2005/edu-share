import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class InvalidEmailException extends DomainException {
  constructor(message = 'Định dạng email không hợp lệ') {
    super(message, 'INVALID_EMAIL');
  }
}
