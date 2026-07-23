import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class ExperienceMustBePositiveException extends DomainException {
  constructor() {
    super(
      'Kinh nghiệm cộng hoặc trừ phải lớn hơn 0.',
      'EXPERIENCE_MUST_BE_POSITIVE',
      400,
    );
  }
}
