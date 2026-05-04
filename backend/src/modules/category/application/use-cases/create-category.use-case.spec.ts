import { CreateCategoryUseCase } from './create-category.use-case';
import { ICategoryRepository } from '../../domain/interfaces/category.repository.interface';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { ParentCategoryNotFoundException } from '../../domain/exceptions/parent-category-not-found.exception';
import { CategoryNameAlreadyExistsException } from '../../domain/exceptions/category-name-already-exists.exception';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid'),
}));

describe('CreateCategoryUseCase', () => {
  let useCase: CreateCategoryUseCase;
  let mockCategoryRepository: jest.Mocked<ICategoryRepository>;

  beforeEach(() => {
    mockCategoryRepository = {
      findById: jest.fn(),
      findByNameAndParent: jest.fn(),
      save: jest.fn(),
    } as any;

    useCase = new CreateCategoryUseCase(mockCategoryRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create category successfully without parent', async () => {
    const dto = {
      name: 'Electronics',
    };

    mockCategoryRepository.findByNameAndParent.mockResolvedValue(null);

    const mockSavedCategory = CategoryEntity.create({
      id: 'mock-uuid',
      name: dto.name,
    });

    mockCategoryRepository.save.mockResolvedValue(mockSavedCategory);

    const result = await useCase.execute(dto);

    expect(mockCategoryRepository.findByNameAndParent).toHaveBeenCalledWith(
      dto.name,
      null,
    );

    expect(mockCategoryRepository.save).toHaveBeenCalled();

    expect(result).toEqual(mockSavedCategory.getProps());
  });

  it('should create category successfully with parent', async () => {
    const dto = {
      name: 'Laptop',
      parentId: 'parent-id',
    };

    mockCategoryRepository.findById.mockResolvedValue({} as any);
    mockCategoryRepository.findByNameAndParent.mockResolvedValue(null);

    const mockSavedCategory = CategoryEntity.create({
      id: 'mock-uuid',
      name: dto.name,
      parentId: dto.parentId,
    });

    mockCategoryRepository.save.mockResolvedValue(mockSavedCategory);

    const result = await useCase.execute(dto);

    expect(mockCategoryRepository.findById).toHaveBeenCalledWith(dto.parentId);
    expect(mockCategoryRepository.save).toHaveBeenCalled();
    expect(result).toEqual(mockSavedCategory.getProps());
  });

  it('should throw ParentCategoryNotFoundException if parent not found', async () => {
    const dto = {
      name: 'Laptop',
      parentId: 'invalid-parent-id',
    };

    mockCategoryRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute(dto)).rejects.toThrow(
      ParentCategoryNotFoundException,
    );

    expect(mockCategoryRepository.findById).toHaveBeenCalledWith(dto.parentId);
  });

  it('should throw CategoryNameAlreadyExistsException if name already exists', async () => {
    const dto = {
      name: 'Electronics',
    };

    mockCategoryRepository.findByNameAndParent.mockResolvedValue({} as any);

    await expect(useCase.execute(dto)).rejects.toThrow(
      CategoryNameAlreadyExistsException,
    );

    expect(mockCategoryRepository.findByNameAndParent).toHaveBeenCalledWith(
      dto.name,
      null,
    );
  });
});
