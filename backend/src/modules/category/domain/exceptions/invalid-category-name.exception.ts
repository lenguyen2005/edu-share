import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class InvalidCategoryNameException extends DomainException {
  constructor() {
    super('Tên danh mục phải có ít nhất 2 ký tự', 'INVALID_CATEGORY_NAME', 400);
  }
}
