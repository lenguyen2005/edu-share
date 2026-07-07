import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class CommentAlreadyResolvedException extends DomainException {
  constructor() {
    super(
      'Comment đã được đánh dấu giải quyết.',
      'COMMENT_ALREADY_RESOLVED',
      409,
    );
  }
}
