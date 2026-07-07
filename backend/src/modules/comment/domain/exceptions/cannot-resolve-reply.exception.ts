import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class CannotResolveReplyException extends DomainException {
  constructor() {
    super(
      'Không thể đánh dấu giải quyết cho reply.',
      'CANNOT_RESOLVE_REPLY',
      400,
    );
  }
}
