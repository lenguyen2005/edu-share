import { Injectable, Inject } from '@nestjs/common';
import { IDocumentRepository } from '../../domain/interfaces/document.repository.interface';
import { GetDocumentsQueryDto } from '../dtos/get-documents-query.dto';

@Injectable()
export class GetDocumentsUseCase {
  constructor(
    @Inject('IDocumentRepository')
    private readonly documentRepository: IDocumentRepository,
  ) {}

  async execute(query: GetDocumentsQueryDto, currentUserId?: string) {
    const { page = 1, limit = 10, categoryId, search } = query;

    const skip = (page - 1) * limit;

    const [documents, total] = await this.documentRepository.findAll({
      skip,
      take: limit,
      categoryId,
      search,
      currentUserId,
    });

    return {
      items: documents.map((doc) => doc.getProps()),
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }
}
