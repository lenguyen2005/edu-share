import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/user.repository.interface';

@Injectable()
export class LogoutUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<void> {
    await this.userRepository.updateRefreshToken(userId, null);
  }
}
