import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class InvalidTitleException extends DomainException {
  constructor() {
    super('Tiêu đề tài liệu phải có ít nhất 5 ký tự', 'INVALID_TITLE', 400);
  }
}
