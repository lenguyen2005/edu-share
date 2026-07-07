import { IDocumentRepository } from 'src/modules/document/domain/interfaces/document.repository.interface';
import { CommentTreeDto } from '../dtos/comment-tree.dto';
import { GetDocumentCommentsQuery } from '../queries/get-document-comments.query';
import { DocumentNotFoundException } from 'src/modules/document/domain/exceptions/document-not-found.exception';
import { Inject, Injectable } from '@nestjs/common';
import { ICommentQueryRepository } from '../../domain/interfaces/comment-query.repository.interface';

@Injectable()
export class GetDocumentCommentsUseCase {
  constructor(
    @Inject('ICommentQueryRepository')
    private readonly commentQueryRepository: ICommentQueryRepository,

    @Inject('IDocumentRepository')
    private readonly documentRepository: IDocumentRepository,
  ) {}

  async execute(query: GetDocumentCommentsQuery): Promise<CommentTreeDto[]> {
    const document = await this.documentRepository.findById(query.documentId);

    if (!document) {
      throw new DocumentNotFoundException();
    }

    return this.commentQueryRepository.findTreeByDocumentId(query.documentId);
  }
}
