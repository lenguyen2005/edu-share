import { Injectable, Inject } from '@nestjs/common';
import { ICategoryRepository } from '../../domain/interfaces/category.repository.interface';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateCategoryDto } from '../dtos/create-category.dto';

import { ParentCategoryNotFoundException } from '../../domain/exceptions/parent-category-not-found.exception';
import { CategoryNameAlreadyExistsException } from '../../domain/exceptions/category-name-already-exists.exception';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(dto: CreateCategoryDto) {
    const parentId = dto.parentId || null;

    if (parentId) {
      const parent = await this.categoryRepository.findById(parentId);
      if (!parent) {
        throw new ParentCategoryNotFoundException();
      }
    }

    const existingCategory = await this.categoryRepository.findByNameAndParent(
      dto.name,
      parentId,
    );

    if (existingCategory) {
      throw new CategoryNameAlreadyExistsException(dto.name);
    }

    const category = CategoryEntity.create({
      id: uuidv4(),
      name: dto.name,
      parentId: parentId,
    });

    const savedCategory = await this.categoryRepository.save(category);

    return savedCategory.getProps();
  }
}
