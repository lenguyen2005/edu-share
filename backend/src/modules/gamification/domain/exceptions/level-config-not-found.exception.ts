import { DomainException } from 'src/common/domain/exceptions/domain.exception';

export class LevelConfigNotFoundException extends DomainException {
  constructor() {
    super('Không tìm thấy cấu hình cấp độ.', 'LEVEL_CONFIG_NOT_FOUND', 404);
  }
}
