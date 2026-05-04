import { ArchiveDocumentUseCase } from './archive-document.use-case';
import { IDocumentRepository } from '../../domain/interfaces/document.repository.interface';
import { DocumentNotFoundException } from '../../domain/exceptions/document-not-found.exception';
import { UnauthorizedDocumentAccessException } from '../../domain/exceptions/unauthorized-document-access.exception';

describe('ArchiveDocumentUseCase', () => {
  let useCase: ArchiveDocumentUseCase;
  let mockDocRepo: jest.Mocked<IDocumentRepository>;

  beforeEach(() => {
    mockDocRepo = {
      findById: jest.fn(),
      update: jest.fn(),
    } as any;

    useCase = new ArchiveDocumentUseCase(mockDocRepo);
  });

  it('nên quăng lỗi NotFound nếu tài liệu không tồn tại', async () => {
    mockDocRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute('doc-1', 'user-1')).rejects.toThrow(
      DocumentNotFoundException,
    );

    expect(mockDocRepo.update).not.toHaveBeenCalled();
  });

  it('nên quăng lỗi Forbidden nếu người dùng không phải tác giả', async () => {
    const mockDoc = {
      getAuthorId: jest.fn().mockReturnValue('owner-id'),
      archive: jest.fn(),
    };

    mockDocRepo.findById.mockResolvedValue(mockDoc as any);

    await expect(useCase.execute('doc-1', 'attacker-id')).rejects.toThrow(
      UnauthorizedDocumentAccessException,
    );

    expect(mockDoc.archive).not.toHaveBeenCalled();
    expect(mockDocRepo.update).not.toHaveBeenCalled();
  });

  it('nên archive và update document khi hợp lệ', async () => {
    const mockDoc = {
      getAuthorId: jest.fn().mockReturnValue('user-1'),
      archive: jest.fn(),
    };

    mockDocRepo.findById.mockResolvedValue(mockDoc as any);

    await useCase.execute('doc-1', 'user-1');

    expect(mockDoc.archive).toHaveBeenCalledTimes(1);
    expect(mockDocRepo.update).toHaveBeenCalledWith(mockDoc);
  });
});
