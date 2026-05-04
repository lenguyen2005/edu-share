import {
  AccessTokenPayload,
  RefreshTokenPayload,
} from '../../infrastructure/services/jwt-token.service';

export interface ITokenService {
  generateAccessToken(payload: any): string;
  generateRefreshToken(payload: { sub: string }): string;
  verifyAccessToken(token: string): AccessTokenPayload | null;
  verifyRefreshToken(token: string): RefreshTokenPayload | null;
}
