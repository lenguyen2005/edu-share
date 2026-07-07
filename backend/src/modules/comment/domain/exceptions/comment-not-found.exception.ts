import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class CommentNotFoundException extends DomainException {
  constructor() {
    super('Comment không tồn tại.', 'COMMENT_NOT_FOUND', 404);
  }
}
