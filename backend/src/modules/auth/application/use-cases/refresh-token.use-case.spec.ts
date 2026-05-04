import { RefreshTokenUseCase } from './refresh-token.use-case';
import { UserEntity } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.vo';
import { Password } from '../../domain/value-objects/password.vo';
import { Role } from '../../domain/enum/role.enum';
import { InvalidRefreshTokenException } from '../../domain/exceptions/invalid-refresh-token.exception';
import { RefreshTokenReuseDetectedException } from '../../domain/exceptions/refresh-token-reuse.exception';
import { AccessDeniedException } from '../../domain/exceptions/access-denied.exception';

describe('RefreshTokenUseCase', () => {
  let useCase: RefreshTokenUseCase;
  let mockUserRepository: any;
  let mockTokenService: any;
  let mockPasswordHasher: any;

  const userId = 'user-123';
  const rawRefreshToken = 'old-raw-token';
  const hashedRefreshToken = 'hashed-old-token';

  const mockUser = new UserEntity(
    userId,
    new Email('test@gmail.com'),
    new Password('password-hash'),
    'Nguyen Van A',
    Role.STUDENT,
    0,
    1,
    new Date(),
    new Date(),
    hashedRefreshToken, // User đang có token đã hash trong DB
  );

  beforeEach(() => {
    mockUserRepository = {
      findById: jest.fn(),
      updateRefreshToken: jest.fn(),
    };
    mockTokenService = {
      verifyRefreshToken: jest.fn(),
      generateAccessToken: jest.fn(),
      generateRefreshToken: jest.fn(),
    };
    mockPasswordHasher = {
      hash: jest.fn(),
      compare: jest.fn(),
    };

    useCase = new RefreshTokenUseCase(
      mockUserRepository,
      mockTokenService,
      mockPasswordHasher,
    );
  });

  it('nên refresh thành công khi token hợp lệ và khớp với DB', async () => {
    mockTokenService.verifyRefreshToken.mockReturnValue({ sub: userId, jti: 'jti-123' });
    mockUserRepository.findById.mockResolvedValue(mockUser);
    mockPasswordHasher.compare.mockResolvedValue(true); // Khớp hash

    mockTokenService.generateAccessToken.mockReturnValue('new-access-token');
    mockTokenService.generateRefreshToken.mockReturnValue('new-raw-refresh-token');
    mockPasswordHasher.hash.mockResolvedValue('new-hashed-refresh-token');

    const result = await useCase.execute(rawRefreshToken);

    expect(result.accessToken).toBe('new-access-token');
    expect(result.refreshToken).toBe('new-raw-refresh-token');

    expect(mockUserRepository.updateRefreshToken).toHaveBeenCalledWith(userId, 'new-hashed-refresh-token');
    expect(mockPasswordHasher.compare).toHaveBeenCalledWith(rawRefreshToken, hashedRefreshToken);
  });

  it('nên quăng lỗi nếu verifyRefreshToken thất bại (token fake hoặc hết hạn)', async () => {
    mockTokenService.verifyRefreshToken.mockReturnValue(null);

    await expect(useCase.execute('fake-token')).rejects.toThrow(InvalidRefreshTokenException);
    expect(mockUserRepository.findById).not.toHaveBeenCalled();
  });

  it('nên quăng lỗi và XÓA token trong DB nếu token không khớp hash (Reuse Detection)', async () => {
    mockTokenService.verifyRefreshToken.mockReturnValue({ sub: userId, jti: 'jti-old' });
    mockUserRepository.findById.mockResolvedValue(mockUser);
    mockPasswordHasher.compare.mockResolvedValue(false);

    await expect(useCase.execute(rawRefreshToken)).rejects.toThrow(RefreshTokenReuseDetectedException);

    expect(mockUserRepository.updateRefreshToken).toHaveBeenCalledWith(userId, null);
  });

  it('nên quăng lỗi nếu user không còn tồn tại hoặc không có token trong DB', async () => {
    mockTokenService.verifyRefreshToken.mockReturnValue({ sub: userId, jti: 'jti-123' });
    mockUserRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute(rawRefreshToken)).rejects.toThrow(AccessDeniedException);
  });

  it('nên quăng lỗi nếu payload không có jti', async () => {
    mockTokenService.verifyRefreshToken.mockReturnValue({
      sub: userId,
    });

    await expect(useCase.execute(rawRefreshToken)).rejects.toThrow(
      InvalidRefreshTokenException,
    );

    expect(mockUserRepository.findById).not.toHaveBeenCalled();
  });

  it('nên quăng lỗi nếu user không có refresh token trong DB', async () => {
    const userWithoutToken = new UserEntity(
      userId,
      new Email('test@gmail.com'),
      new Password('password-hash'),
      'Nguyen Van A',
      Role.STUDENT,
      0,
      1,
      new Date(),
      new Date(),
      null,
    );

    mockTokenService.verifyRefreshToken.mockReturnValue({
      sub: userId,
      jti: 'jti-123',
    });

    mockUserRepository.findById.mockResolvedValue(userWithoutToken);

    await expect(useCase.execute(rawRefreshToken)).rejects.toThrow(
      AccessDeniedException,
    );
  });
});
