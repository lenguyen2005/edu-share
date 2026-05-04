import { Category as PrismaCategory } from '@prisma/client';
import { CategoryEntity } from '../../../../domain/entities/category.entity';

export class PrismaCategoryMapper {
  static toDomain(raw: PrismaCategory): CategoryEntity {
    return new CategoryEntity(
      raw.id,
      raw.name,
      raw.parentId,
      raw.createdAt,
      raw.updatedAt,
      raw.deletedAt,
    );
  }

  static toPrisma(domain: CategoryEntity) {
    const props = domain.getProps();
    return {
      id: props.id,
      name: props.name,
      parentId: props.parentId,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    };
  }
}
