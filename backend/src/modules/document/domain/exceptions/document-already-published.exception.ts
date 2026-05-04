import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class DocumentAlreadyPublishedException extends DomainException {
  constructor() {
    super('Tài liệu đã được publish', 'DOCUMENT_ALREADY_PUBLISHED', 400);
  }
}
