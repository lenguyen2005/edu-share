import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class CategoryAlreadyArchivedException extends DomainException {
  constructor() {
    super('Danh mục đã được lưu trữ', 'CATEGORY_ALREADY_ARCHIVED', 400);
  }
}
