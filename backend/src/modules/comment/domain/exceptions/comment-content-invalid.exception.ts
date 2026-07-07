import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class CommentContentInvalidException extends DomainException {
  constructor() {
    super(
      'Nội dung comment phải có ít nhất 3 ký tự.',
      'COMMENT_CONTENT_INVALID',
      400,
    );
  }
}
