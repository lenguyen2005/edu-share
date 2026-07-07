import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class CommentNotResolvedException extends DomainException {
  constructor() {
    super(
      'Comment chưa được đánh dấu giải quyết.',
      'COMMENT_NOT_RESOLVED',
      409,
    );
  }
}
