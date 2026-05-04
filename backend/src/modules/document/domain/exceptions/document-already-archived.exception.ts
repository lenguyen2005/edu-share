import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class DocumentAlreadyArchivedException extends DomainException {
  constructor() {
    super(
      'Tài liệu đã nằm trong kho lưu trữ',
      'DOCUMENT_ALREADY_ARCHIVED',
      400,
    );
  }
}
