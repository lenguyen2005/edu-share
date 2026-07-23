import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class InvalidExpException extends DomainException {
  constructor(exp: number) {
    super(
      `Giá trị EXP không hợp lệ: ${exp}. EXP phải lớn hơn 0.`,
      'INVALID_EXP',
      400,
    );
  }
}
