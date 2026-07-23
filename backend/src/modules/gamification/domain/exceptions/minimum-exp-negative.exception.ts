import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class MinimumExpNegativeException extends DomainException {
  constructor() {
    super('EXP tối thiểu không được nhỏ hơn 0.', 'MINIMUM_EXP_NEGATIVE', 400);
  }
}
