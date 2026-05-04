import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class AccessDeniedException extends DomainException {
  constructor() {
    super('Access Denied', 'ACCESS_DENIED', 403);
  }
}
