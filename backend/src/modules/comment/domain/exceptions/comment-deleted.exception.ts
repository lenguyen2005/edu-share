import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class CommentDeletedException extends DomainException {
  constructor() {
    super('Comment đã bị xóa.', 'COMMENT_DELETED', 410);
  }
}
