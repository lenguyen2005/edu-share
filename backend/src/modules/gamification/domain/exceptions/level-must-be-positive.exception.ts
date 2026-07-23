import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class LevelMustBePositiveException extends DomainException {
  constructor() {
    super('Level phải lớn hơn hoặc bằng 1.', 'LEVEL_MUST_BE_POSITIVE', 400);
  }
}
