import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { ICategoryRepository } from '../../../../domain/interfaces/category.repository.interface';
import { CategoryEntity } from '../../../../domain/entities/category.entity';
import { PrismaCategoryMapper } from '../mappers/prisma-category.mapper';

@Injectable()
export class PrismaCategoryRepository implements ICategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(category: CategoryEntity): Promise<CategoryEntity> {
    const data = PrismaCategoryMapper.toPrisma(category);

    const saved = await this.prisma.category.create({
      data,
    });

    return PrismaCategoryMapper.toDomain(saved);
  }

  async findById(id: string): Promise<CategoryEntity | null> {
    const category = await this.prisma.category.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    return category ? PrismaCategoryMapper.toDomain(category) : null;
  }

  async findByNameAndParent(
    name: string,
    parentId: string | null,
  ): Promise<CategoryEntity | null> {
    const category = await this.prisma.category.findFirst({
      where: {
        name,
        parentId,
        deletedAt: null,
      },
    });

    return category ? PrismaCategoryMapper.toDomain(category) : null;
  }

  async findAll(): Promise<CategoryEntity[]> {
    const categories = await this.prisma.category.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return categories.map((c) => PrismaCategoryMapper.toDomain(c));
  }

  async findAllRoots(): Promise<CategoryEntity[]> {
    const categories = await this.prisma.category.findMany({
      where: {
        parentId: null,
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return categories.map((c) => PrismaCategoryMapper.toDomain(c));
  }

  async getChildren(parentId: string): Promise<CategoryEntity[]> {
    const categories = await this.prisma.category.findMany({
      where: {
        parentId,
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return categories.map((c) => PrismaCategoryMapper.toDomain(c));
  }

  async update(category: CategoryEntity): Promise<CategoryEntity> {
    const data = PrismaCategoryMapper.toPrisma(category);

    const updated = await this.prisma.category.update({
      where: { id: data.id },
      data,
    });

    return PrismaCategoryMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    // ✅ Soft delete
    await this.prisma.category.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
