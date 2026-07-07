import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class CommentPermissionDeniedException extends DomainException {
  constructor() {
    super(
      'Bạn không có quyền thực hiện thao tác này.',
      'COMMENT_PERMISSION_DENIED',
      403,
    );
  }
}
