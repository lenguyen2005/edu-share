import { Module } from '@nestjs/common';
import { CategoryController } from './presentation/controllers/category.controller';
import { CreateCategoryUseCase } from './application/use-cases/create-category.use-case';
import { GetCategoryTreeUseCase } from './application/use-cases/get-category-tree.use-case';
import { PrismaCategoryRepository } from './infrastructure/persistence/prisma/repositories/prisma-category.repository';

@Module({
  controllers: [CategoryController],
  providers: [
    CreateCategoryUseCase,
    GetCategoryTreeUseCase,
    {
      provide: 'ICategoryRepository',
      useClass: PrismaCategoryRepository,
    },
  ],
  exports: ['ICategoryRepository'],
})
export class CategoryModule {}
