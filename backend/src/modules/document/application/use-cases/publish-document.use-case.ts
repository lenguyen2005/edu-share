import { Inject, Injectable } from '@nestjs/common';
import { IDocumentRepository } from '../../domain/interfaces/document.repository.interface';
import { DocumentNotFoundException } from '../../domain/exceptions/document-not-found.exception';
import { UnauthorizedDocumentAccessException } from '../../domain/exceptions/unauthorized-document-access.exception';

@Injectable()
export class PublishDocumentUseCase {
  constructor(
    @Inject('IDocumentRepository')
    private readonly documentRepository: IDocumentRepository,
  ) {}

  async execute(documentId: string, userId: string) {
    const document = await this.documentRepository.findById(documentId);

    if (!document) throw new DocumentNotFoundException();
    if (document.getAuthorId() !== userId)
      throw new UnauthorizedDocumentAccessException();

    document.publish();
    return this.documentRepository.update(document);
  }
}
