import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenService } from '../../domain/interfaces/token-service.interface';
import { v4 as uuidv4 } from 'uuid';

export interface AccessTokenPayload {
  sub: string;
  email: string;
  role: string;
}

export interface RefreshTokenPayload {
  sub: string;
  jti: string;
}

@Injectable()
export class JwtTokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(payload: AccessTokenPayload): string {
    return this.jwtService.sign(payload, {
      expiresIn: '15m',
    });
  }

  generateRefreshToken(payload: Pick<RefreshTokenPayload, 'sub'>): string {
    const refreshTokenPayload: RefreshTokenPayload = {
      sub: payload.sub,
      jti: uuidv4(),
    };

    return this.jwtService.sign(refreshTokenPayload, {
      expiresIn: '7d',
    });
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    try {
      return this.jwtService.verify<AccessTokenPayload>(token);
    } catch (error) {
      throw new UnauthorizedException(
        'Access Token không hợp lệ hoặc đã hết hạn',
      );
    }
  }

  verifyRefreshToken(token: string): RefreshTokenPayload {
    try {
      return this.jwtService.verify<RefreshTokenPayload>(token);
    } catch (error) {
      throw new UnauthorizedException(
        'Refresh Token không hợp lệ hoặc đã hết hạn',
      );
    }
  }

  decode(token: string): any {
    return this.jwtService.decode(token);
  }
}
