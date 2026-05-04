import { Password } from 'src/modules/auth/domain/value-objects/password.vo';
import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/modules/auth/domain/interfaces/user.repository.interface';
import { IPasswordHasher } from 'src/modules/auth/domain/interfaces/password-hasher.interface';
import { UserEntity } from 'src/modules/auth/domain/entities/user.entity';
import { Email } from 'src/modules/auth/domain/value-objects/email.vo';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SeedAdminUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordHasher')
    private readonly hashService: IPasswordHasher,
  ) {}

  async execute() {
    const existing = await this.userRepository.findByEmail('admin@gmail.com');

    if (existing) return;

    const password = await this.hashService.hash('123456');

    const admin = UserEntity.createAdmin(
      uuid(),
      new Email('admin@gmail.com'),
      new Password(password),
    );
    await this.userRepository.create(admin);
  }
}
