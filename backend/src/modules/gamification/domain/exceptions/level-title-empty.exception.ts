import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class LevelTitleEmptyException extends DomainException {
  constructor() {
    super('Tên level không được để trống.', 'LEVEL_TITLE_EMPTY', 400);
  }
}
