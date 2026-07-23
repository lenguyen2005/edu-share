import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class ExperienceCannotBeNegativeException extends DomainException {
  constructor() {
    super(
      'Kinh nghiệm không được nhỏ hơn 0.',
      'EXPERIENCE_CANNOT_BE_NEGATIVE',
      400,
    );
  }
}
