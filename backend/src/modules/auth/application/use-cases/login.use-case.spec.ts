import { LoginUseCase } from './login.use-case';
import { InvalidCredentialsException } from '../../domain/exceptions/invalid-credentials.exception';
import { UserEntity } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.vo';
import { Password } from '../../domain/value-objects/password.vo';
import { Role } from '../../domain/enum/role.enum';
import { IUserRepository } from '../../domain/interfaces/user.repository.interface';
import { IPasswordHasher } from '../../domain/interfaces/password-hasher.interface';
import { ITokenService } from '../../domain/interfaces/token-service.interface';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let mockUserRepository: jest.Mocked<IUserRepository>;
  let mockPasswordHasher: jest.Mocked<IPasswordHasher>;
  let mockTokenService: jest.Mocked<ITokenService>;

  const mockUser = new UserEntity(
    'user-123',
    new Email('test@gmail.com'),
    new Password('hashed_password'),
    'Nguyen Van A',
    Role.STUDENT,
    0,
    1,
    new Date(),
    new Date(),
  );

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
      updateRefreshToken: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;
    mockPasswordHasher = {
      compare: jest.fn(),
      hash: jest.fn(),
    };
    mockTokenService = {
      generateAccessToken: jest.fn(),
      generateRefreshToken: jest.fn(),
    } as unknown as jest.Mocked<ITokenService>;

    useCase = new LoginUseCase(
      mockUserRepository,
      mockPasswordHasher,
      mockTokenService,
    );
  });

  it('nên login thành công và trả về token khi thông tin chính xác', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(mockUser);
    mockPasswordHasher.compare.mockResolvedValue(true);

    mockTokenService.generateAccessToken.mockReturnValue(
      'mock_jwt_access_token',
    );
    mockTokenService.generateRefreshToken.mockReturnValue(
      'mock_jwt_refresh_token',
    );
    mockPasswordHasher.hash.mockResolvedValue('hashed_refresh_token');

    const dto = { email: 'test@gmail.com', password: 'password123' };

    const result = await useCase.execute(dto);

    expect(result.accessToken).toBe('mock_jwt_access_token');
    expect(result.refreshToken).toBe('mock_jwt_refresh_token');
    expect(result.user.email).toBe(dto.email);
    expect(mockPasswordHasher.compare).toHaveBeenCalledWith(
      'password123',
      'hashed_password',
    );
    expect(mockUserRepository.updateRefreshToken).toHaveBeenCalledWith(
      mockUser.id,
      'hashed_refresh_token',
    );
    expect(mockTokenService.generateAccessToken).toHaveBeenCalledWith({
      sub: mockUser.id,
      email: mockUser.getEmail().getValue(),
      role: mockUser.getRole(),
    });

    expect(mockTokenService.generateRefreshToken).toHaveBeenCalledWith({
      sub: mockUser.id,
    });
  });

  it('nên quăng lỗi nếu không tìm thấy email', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);

    const dto = { email: 'wrong@gmail.com', password: 'any' };

    await expect(useCase.execute(dto)).rejects.toThrow(
      InvalidCredentialsException,
    );
    expect(mockPasswordHasher.compare).not.toHaveBeenCalled();
  });

  it('nên quăng lỗi nếu mật khẩu không khớp', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(mockUser);
    mockPasswordHasher.compare.mockResolvedValue(false);

    const dto = { email: 'test@gmail.com', password: 'wrong_password' };
    await expect(useCase.execute(dto)).rejects.toThrow(
      InvalidCredentialsException,
    );
    expect(mockTokenService.generateAccessToken).not.toHaveBeenCalled();
    expect(mockTokenService.generateRefreshToken).not.toHaveBeenCalled();
    expect(mockUserRepository.updateRefreshToken).not.toHaveBeenCalled();
  });
});
