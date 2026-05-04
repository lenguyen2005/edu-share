import { PasswordMismatchException } from './../../domain/exceptions/password-mismatch.exception';
import { Injectable, Inject } from '@nestjs/common';
import type { IUserRepository } from '../../domain/interfaces/user.repository.interface';
import type { IPasswordHasher } from '../../domain/interfaces/password-hasher.interface';
import { UserEntity } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.vo';
import { Password } from '../../domain/value-objects/password.vo';
import { Role } from '../../domain/enum/role.enum';
import { UserAlreadyExistsException } from '../../domain/exceptions/user-already-exists.exception';
import { v4 as uuid } from 'uuid';
import { RegisterInput } from '../inputs/register.input';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordHasher')
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async execute(input: RegisterInput): Promise<UserEntity> {
    await this.ensureEmailNotExists(input.email);

    if (input.password !== input.confirmPassword) {
      throw new PasswordMismatchException();
    }

    const hashedPassword = await this.passwordHasher.hash(input.password);

    const user = this.createUserEntity(input, hashedPassword);

    return this.userRepository.create(user);
  }

  private async ensureEmailNotExists(email: string): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new UserAlreadyExistsException();
    }
  }

  private createUserEntity(
    input: RegisterInput,
    hashedPassword: string,
  ): UserEntity {
    return new UserEntity(
      uuid(),
      new Email(input.email),
      new Password(hashedPassword),
      input.fullName,
      Role.STUDENT,
      0,
      1,
      new Date(),
      new Date(),
    );
  }
}
