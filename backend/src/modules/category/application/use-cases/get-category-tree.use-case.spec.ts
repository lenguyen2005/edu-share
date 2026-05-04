import { GetCategoryTreeUseCase } from './get-category-tree.use-case';
import { ICategoryRepository } from '../../domain/interfaces/category.repository.interface';
import { CategoryEntity } from '../../domain/entities/category.entity';

describe('GetCategoryTreeUseCase', () => {
  let useCase: GetCategoryTreeUseCase;
  let mockCategoryRepository: jest.Mocked<ICategoryRepository>;

  beforeEach(() => {
    mockCategoryRepository = {
      findAll: jest.fn(),
    } as any;

    useCase = new GetCategoryTreeUseCase(mockCategoryRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const createCategory = (id: string, name: string, parentId?: string) => {
    return CategoryEntity.create({
      id,
      name,
      parentId: parentId || null,
    });
  };

  it('should return empty array when no categories', async () => {
    mockCategoryRepository.findAll.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual([]);
  });

  it('should return flat list when no parent-child relationship', async () => {
    const categories = [
      createCategory('1', 'AAA'),
      createCategory('2', 'BBB'),
    ];

    mockCategoryRepository.findAll.mockResolvedValue(categories);

    const result = await useCase.execute();

    expect(result).toHaveLength(2);
    expect(result[0].children).toEqual([]);
    expect(result[1].children).toEqual([]);
  });

  it('should build 1-level tree correctly', async () => {
    const categories = [
      createCategory('1', 'Parent'),
      createCategory('2', 'Child 1', '1'),
      createCategory('3', 'Child 2', '1'),
    ];

    mockCategoryRepository.findAll.mockResolvedValue(categories);

    const result = await useCase.execute();

    expect(result).toHaveLength(1);

    const parent = result[0];
    expect(parent.id).toBe('1');
    expect(parent.children).toHaveLength(2);

    const childIds = parent.children.map((c) => c.id);
    expect(childIds).toContain('2');
    expect(childIds).toContain('3');
  });

  it('should build multi-level tree correctly', async () => {
    const categories = [
      createCategory('1', 'Root'),
      createCategory('2', 'Child', '1'),
      createCategory('3', 'Grandchild', '2'),
    ];

    mockCategoryRepository.findAll.mockResolvedValue(categories);

    const result = await useCase.execute();

    expect(result).toHaveLength(1);

    const root = result[0];
    expect(root.children).toHaveLength(1);

    const child = root.children[0];
    expect(child.id).toBe('2');
    expect(child.children).toHaveLength(1);

    const grandchild = child.children[0];
    expect(grandchild.id).toBe('3');
  });

  it('should push node to root if parent not found', async () => {
    const categories = [
      createCategory('1', 'Valid Root'),
      createCategory('2', 'Orphan', '999'), // parent không tồn tại
    ];

    mockCategoryRepository.findAll.mockResolvedValue(categories);

    const result = await useCase.execute();

    expect(result).toHaveLength(2);

    const ids = result.map((r) => r.id);
    expect(ids).toContain('1');
    expect(ids).toContain('2');
  });
});
