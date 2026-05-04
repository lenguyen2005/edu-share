import { Controller, UseGuards, Post, Body, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';
import { CreateCategoryUseCase } from '../../application/use-cases/create-category.use-case';
import { CreateCategoryDto } from '../../application/dtos/create-category.dto';
import { RolesGuard } from 'src/modules/auth/infrastructure/guards/roles.guard';
import { Role } from 'src/modules/auth/domain/enum/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { GetCategoryTreeUseCase } from '../../application/use-cases/get-category-tree.use-case';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getCategoryTreeUseCase: GetCategoryTreeUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async create(@Body() dto: CreateCategoryDto) {
    const result = await this.createCategoryUseCase.execute(dto);
    return {
      success: true,
      data: result,
    };
  }

  @Get('tree')
  async getTree() {
    const tree = await this.getCategoryTreeUseCase.execute();
    return {
      success: true,
      data: tree,
    };
  }
}
