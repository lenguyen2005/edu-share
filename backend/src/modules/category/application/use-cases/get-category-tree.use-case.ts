import { Injectable, Inject } from '@nestjs/common';
import { ICategoryRepository } from '../../domain/interfaces/category.repository.interface';
import { CategoryTreeDto } from '../dtos/category-tree.dto';

@Injectable()
export class GetCategoryTreeUseCase {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(): Promise<CategoryTreeDto[]> {
    const allCategories = await this.categoryRepository.findAll();

    const nodes: CategoryTreeDto[] = allCategories.map((cat) => ({
      ...cat.getProps(),
      children: [],
    }));

    const map = new Map<string, CategoryTreeDto>();
    nodes.forEach((node) => map.set(node.id, node));

    const tree: CategoryTreeDto[] = [];

    nodes.forEach((node) => {
      if (node.parentId !== null && node.parentId !== undefined) {
        const parent = map.get(node.parentId);
        if (parent) {
          parent.children.push(node);
        } else {
          tree.push(node);
        }
      } else {
        tree.push(node);
      }
    });

    return tree;
  }
}
