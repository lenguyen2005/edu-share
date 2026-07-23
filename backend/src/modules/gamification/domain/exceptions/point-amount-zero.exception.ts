import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class PointAmountZeroException extends DomainException {
  constructor() {
    super('Điểm thay đổi không được bằng 0.', 'POINT_AMOUNT_ZERO', 400);
  }
}
