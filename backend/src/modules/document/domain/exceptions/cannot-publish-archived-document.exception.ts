import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class CannotPublishArchivedDocumentException extends DomainException {
  constructor() {
    super(
      'Không thể publish tài liệu đã bị lưu trữ',
      'CANNOT_PUBLISH_ARCHIVED_DOCUMENT',
      400,
    );
  }
}
