import { Type } from 'class-transformer';

export class GetDocumentsQueryDto {
  @Type(() => Number)
  page?: number = 1;

  @Type(() => Number)
  limit?: number = 10;

  categoryId?: string;
  search?: string;
}
