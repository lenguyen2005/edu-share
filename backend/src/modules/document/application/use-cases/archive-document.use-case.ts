import { Injectable, Inject } from '@nestjs/common';
import { IDocumentRepository } from '../../domain/interfaces/document.repository.interface';
import { DocumentNotFoundException } from '../../domain/exceptions/document-not-found.exception';
import { UnauthorizedDocumentAccessException } from '../../domain/exceptions/unauthorized-document-access.exception';

@Injectable()
export class ArchiveDocumentUseCase {
  constructor(
    @Inject('IDocumentRepository')
    private readonly documentRepository: IDocumentRepository,
  ) {}

  async execute(documentId: string, currentUserId: string): Promise<void> {
    const document = await this.documentRepository.findById(documentId);

    if (!document) {
      throw new DocumentNotFoundException();
    }

    if (document.getAuthorId() !== currentUserId) {
      throw new UnauthorizedDocumentAccessException();
    }

    document.archive();

    await this.documentRepository.update(document);
  }
}
