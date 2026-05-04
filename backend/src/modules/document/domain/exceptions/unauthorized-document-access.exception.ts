import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class UnauthorizedDocumentAccessException extends DomainException {
  constructor() {
    super(
      'Bạn không có quyền chỉnh sửa tài liệu này',
      'UNAUTHORIZED_ACCESS',
      403,
    );
  }
}
