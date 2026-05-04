import { IUserRepository } from '../../domain/interfaces/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IPasswordHasher } from '../../domain/interfaces/password-hasher.interface';
import { ITokenService } from '../../domain/interfaces/token-service.interface';
import { LoginInput } from '../dtos/login.input';
import { InvalidCredentialsException } from '../../domain/exceptions/invalid-credentials.exception';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('IPasswordHasher') private readonly passwordHasher: IPasswordHasher,
    @Inject('ITokenService') private readonly tokenService: ITokenService,
  ) {}

  async execute(dto: LoginInput) {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new InvalidCredentialsException();
    }

    const isPasswordValid = await this.passwordHasher.compare(
      dto.password,
      user.getPasswordHash(),
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    const accessToken = this.tokenService.generateAccessToken({
      sub: user.id,
      email: user.getEmail().getValue(),
      role: user.getRole(),
    });

    const refreshToken = this.tokenService.generateRefreshToken({
      sub: user.id,
    });
    const hashedRefreshToken = await this.passwordHasher.hash(refreshToken);
    await this.userRepository.updateRefreshToken(user.id, hashedRefreshToken);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.getEmail().getValue(),
        fullName: user.getFullName(),
        role: user.getRole(),
      },
    };
  }
}
