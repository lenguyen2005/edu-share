import { GetDocumentLinkUseCase } from './get-document-link.use-case';
import { UnauthorizedDocumentAccessException } from '../../domain/exceptions/unauthorized-document-access.exception';

describe('GetDocumentLinkUseCase', () => {
  let useCase: GetDocumentLinkUseCase;
  let mockDocRepo: any;
  let mockStorage: any;

  beforeEach(() => {
    mockDocRepo = { findById: jest.fn() };
    mockStorage = { getSignedUrl: jest.fn() };
    useCase = new GetDocumentLinkUseCase(mockDocRepo, mockStorage);
  });

  it('nên trả về link thành công nếu là chủ sở hữu', async () => {
    const mockDoc = {
      getAuthorId: () => 'user-1',
      getStatus: () => 'DRAFT',
      getFileKey: () => 'key-123',
      isDeleted: () => false,
    };
    mockDocRepo.findById.mockResolvedValue(mockDoc);
    mockStorage.getSignedUrl.mockResolvedValue('https://signed-url.com');

    const result = await useCase.execute('doc-1', 'user-1');

    expect(result).toBe('https://signed-url.com');
    expect(mockStorage.getSignedUrl).toHaveBeenCalledWith('key-123');
  });

  it('nên quăng lỗi Forbidden nếu xem tài liệu DRAFT của người khác', async () => {
    const mockDoc = {
      getAuthorId: () => 'user-owner',
      getStatus: () => 'DRAFT',
      isDeleted: () => false,
    };
    mockDocRepo.findById.mockResolvedValue(mockDoc);

    await expect(useCase.execute('doc-1', 'user-stranger')).rejects.toThrow(
      UnauthorizedDocumentAccessException,
    );
  });
});
