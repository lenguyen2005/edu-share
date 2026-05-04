import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class CannotSetSelfAsParentException extends DomainException {
  constructor() {
    super(
      'Danh mục không thể làm cha của chính nó',
      'CATEGORY_SELF_PARENT',
      400,
    );
  }
}
