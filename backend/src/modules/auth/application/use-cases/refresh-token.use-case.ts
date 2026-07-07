import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/user.repository.interface';
import { ITokenService } from '../../domain/interfaces/token-service.interface';
import { IPasswordHasher } from '../../domain/interfaces/password-hasher.interface';
import { InvalidRefreshTokenException } from '../../domain/exceptions/invalid-refresh-token.exception';
import { RefreshTokenReuseDetectedException } from '../../domain/exceptions/refresh-token-reuse.exception';
import { AccessDeniedException } from '../../domain/exceptions/access-denied.exception';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('ITokenService') private readonly tokenService: ITokenService,
    @Inject('IPasswordHasher') private readonly passwordHasher: IPasswordHasher,
  ) {}

  async execute(refreshTokenRaw: string) {
    const payload = this.tokenService.verifyRefreshToken(refreshTokenRaw);

    if (!payload || !payload.jti) {
      throw new InvalidRefreshTokenException();
    }

    const user = await this.userRepository.findById(payload.sub);

    if (!user || !user.getRefreshToken()) {
      throw new AccessDeniedException();
    }

    const isMatched = await this.passwordHasher.compare(
      refreshTokenRaw,
      user.getRefreshToken()!,
    );

    if (!isMatched) {
      await this.userRepository.updateRefreshToken(user.id, null);
      throw new RefreshTokenReuseDetectedException();
    }

    const newAccessToken = this.tokenService.generateAccessToken({
      sub: user.id,
      email: user.getEmail().getValue(),
      role: user.getRole(),
    });

    const newRefreshToken = this.tokenService.generateRefreshToken({
      sub: user.id,
    });

    const newHashedRefreshToken =
      await this.passwordHasher.hash(newRefreshToken);

    await this.userRepository.updateRefreshToken(
      user.id,
      newHashedRefreshToken,
    );

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user: {
        id: user.id,
        email: user.getEmail().getValue(),
        fullName: user.getFullName(),
        role: user.getRole(),
      },
    };
  }
}
