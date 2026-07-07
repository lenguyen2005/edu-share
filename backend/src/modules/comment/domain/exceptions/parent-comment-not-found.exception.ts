import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class ParentCommentNotFoundException extends DomainException {
  constructor() {
    super('Comment cha không tồn tại.', 'PARENT_COMMENT_NOT_FOUND', 404);
  }
}
