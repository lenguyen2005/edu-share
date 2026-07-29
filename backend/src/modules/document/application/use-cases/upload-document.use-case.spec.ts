import { InvalidTitleException } from './../../domain/exceptions/invalid-title.exception';
import { UploadDocumentUseCase } from './create-document.use-case';
import { DocumentEntity } from '../../domain/entities/document.entity';

describe('UploadDocumentUseCase', () => {
  let useCase: UploadDocumentUseCase;
  let mockDocumentRepository: any;
  let mockStorageService: any;

  const mockFile = {
    originalname: 'test-document.pdf',
    mimetype: 'application/pdf',
    size: 1024,
    buffer: Buffer.from('file content'),
  } as Express.Multer.File;

  const mockDto = {
    title: 'Tài liệu hướng dẫn NestJS',
    description: 'Mô tả chi tiết về tài liệu',
    categoryId: 'category-uuid',
  };

  const authorId = 'user-uuid';

  beforeEach(() => {
    mockDocumentRepository = {
      create: jest.fn(),
    };
    mockStorageService = {
      upload: jest.fn(),
    };

    useCase = new UploadDocumentUseCase(
      mockDocumentRepository,
      mockStorageService,
    );
  });

  it('nên upload tài liệu thành công và trả về thông tin đã lưu', async () => {
    mockStorageService.upload.mockResolvedValue(undefined);

    mockDocumentRepository.create.mockImplementation((doc: DocumentEntity) =>
      Promise.resolve(doc),
    );

    const result = await useCase.execute(mockDto, mockFile, authorId);

    expect(mockStorageService.upload).toHaveBeenCalledWith(
      mockFile,
      expect.any(String),
    );

    expect(mockDocumentRepository.create).toHaveBeenCalled();

    expect(result).toMatchObject({
      title: mockDto.title,
      description: mockDto.description,
    });

    expect(result.fileKey).toBeDefined();
    expect(result.id).toBeDefined();
  });

  it('nên quăng lỗi nếu storage service bị lỗi upload', async () => {
    mockStorageService.upload.mockRejectedValue(new Error('S3 Connection Error'));

    await expect(useCase.execute(mockDto, mockFile, authorId)).rejects.toThrow('S3 Connection Error');

    expect(mockDocumentRepository.create).not.toHaveBeenCalled();
  });

  it('nên kiểm tra tính toàn vẹn của tiêu đề thông qua Entity Validation', async () => {
    mockStorageService.upload.mockResolvedValue('key-123');
    const invalidDto = { ...mockDto, title: 'abc' }; // Tiêu đề < 5 ký tự

    await expect(useCase.execute(invalidDto, mockFile, authorId)).rejects.toThrow(
     InvalidTitleException
    );
  });
});
