import { Injectable, Inject } from '@nestjs/common';
import { IDocumentQueryRepository } from '../../domain/interfaces/document-query.repository.interface';
import { GetDocumentsQueryDto } from '../dtos/get-documents-query.dto';

@Injectable()
export class GetDocumentsUseCase {
  constructor(
    @Inject('IDocumentQueryRepository')
    private readonly repository: IDocumentQueryRepository,
  ) {}

  async execute(query: GetDocumentsQueryDto, currentUserId?: string) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const [items, total] = await this.repository.findAll({
      ...query,
      skip: (page - 1) * limit,
      take: limit,
      currentUserId,
    });

    return {
      items,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }
}
