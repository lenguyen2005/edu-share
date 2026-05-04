import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class ParentCategoryNotFoundException extends DomainException {
  constructor() {
    super('Danh mục cha không tồn tại', 'PARENT_CATEGORY_NOT_FOUND', 404);
  }
}
