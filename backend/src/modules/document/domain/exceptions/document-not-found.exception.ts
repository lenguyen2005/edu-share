import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class DocumentNotFoundException extends DomainException {
  constructor() {
    super('Không tìm thấy tài liệu này', 'DOCUMENT_NOT_FOUND', 404);
  }
}
