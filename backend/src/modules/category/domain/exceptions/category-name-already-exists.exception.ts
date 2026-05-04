import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class CategoryNameAlreadyExistsException extends DomainException {
  constructor(name: string) {
    super(
      `Danh mục "${name}" đã tồn tại trong cấp này`,
      'CATEGORY_NAME_ALREADY_EXISTS',
      409,
    );
  }
}
