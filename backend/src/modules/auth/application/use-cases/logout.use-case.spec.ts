import { LogoutUseCase } from './logout.use-case';

describe('LogoutUseCase', () => {
  let useCase: LogoutUseCase;
  let mockUserRepository: any;

  beforeEach(() => {
    mockUserRepository = {
      updateRefreshToken: jest.fn().mockResolvedValue(undefined),
    };
    useCase = new LogoutUseCase(mockUserRepository);
  });

  it('nên gọi hàm xóa refresh token khi thực hiện logout', async () => {
    const userId = 'user-123';

    await useCase.execute(userId);

    expect(mockUserRepository.updateRefreshToken).toHaveBeenCalledWith(
      userId,
      null,
    );
  });
});
