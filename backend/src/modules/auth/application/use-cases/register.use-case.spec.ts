import { RegisterUseCase } from './register.use-case';
import { UserAlreadyExistsException } from '../../domain/exceptions/user-already-exists.exception';
import { IUserRepository } from '../../domain/interfaces/user.repository.interface';
import { IPasswordHasher } from '../../domain/interfaces/password-hasher.interface';
import { PasswordMismatchException } from '../../domain/exceptions/password-mismatch.exception';

describe('RegisterUseCase', () => {
  let useCase: RegisterUseCase;
  let mockUserRepository: jest.Mocked<IUserRepository>;
  let mockPasswordHasher: jest.Mocked<IPasswordHasher>;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;

    mockPasswordHasher = {
      hash: jest.fn().mockResolvedValue('hashed_password'),
    } as unknown as jest.Mocked<IPasswordHasher>;

    useCase = new RegisterUseCase(mockUserRepository, mockPasswordHasher);
  });

  it('should register successfully', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.create.mockImplementation((user) =>
      Promise.resolve(user),
    );

    const dto = {
      email: 'new@gmail.com',
      password: 'password123',
      confirmPassword: 'password123',
      fullName: 'Test User',
    };

    const result = await useCase.execute(dto);

    expect(result.getEmail().getValue()).toBe(dto.email);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockPasswordHasher.hash).toHaveBeenCalledWith(dto.password);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockUserRepository.create).toHaveBeenCalled();
  });

  it('should throw if email exists', async () => {
    mockUserRepository.findByEmail.mockResolvedValue({
      id: 'existing-id',
    } as any);

    const dto = {
      email: 'existing@gmail.com',
      password: 'password123',
      confirmPassword: 'password123',
      fullName: 'Test User',
    };

    await expect(useCase.execute(dto)).rejects.toThrow(
      UserAlreadyExistsException,
    );

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockUserRepository.create).not.toHaveBeenCalled();
  });

  it('should throw if password mismatch', async () => {
    const dto = {
      email: 'existing@gmail.com',
      password: 'password123',
      confirmPassword: 'password1234',
      fullName: 'Test User',
    };

    await expect(useCase.execute(dto)).rejects.toThrow(
      PasswordMismatchException,
    );

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockUserRepository.create).not.toHaveBeenCalled();
  });
});
