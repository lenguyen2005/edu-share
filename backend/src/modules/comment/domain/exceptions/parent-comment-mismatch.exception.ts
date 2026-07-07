import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class ParentCommentMismatchException extends DomainException {
  constructor() {
    super(
      'Comment cha không thuộc tài liệu này.',
      'PARENT_COMMENT_MISMATCH',
      400,
    );
  }
}
