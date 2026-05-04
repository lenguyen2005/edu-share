import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class InvalidDocumentDataException extends DomainException {
  constructor(field: string) {
    super(`${field} không hợp lệ`, 'INVALID_DOCUMENT_DATA', 400);
  }
}
