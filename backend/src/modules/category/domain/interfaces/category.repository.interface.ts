import { CategoryEntity } from '../entities/category.entity';

export interface ICategoryRepository {
  save(category: CategoryEntity): Promise<CategoryEntity>;
  findById(id: string): Promise<CategoryEntity | null>;
  findByNameAndParent(
    name: string,
    parentId: string | null,
  ): Promise<CategoryEntity | null>;
  findAll(): Promise<CategoryEntity[]>;
  findAllRoots(): Promise<CategoryEntity[]>;
  getChildren(parentId: string): Promise<CategoryEntity[]>;
  update(category: CategoryEntity): Promise<CategoryEntity>;
  delete(id: string): Promise<void>;
}
