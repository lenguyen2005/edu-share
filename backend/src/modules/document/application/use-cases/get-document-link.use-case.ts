import { Injectable, Inject } from '@nestjs/common';
import { IDocumentRepository } from '../../domain/interfaces/document.repository.interface';
import { IStorageService } from '../../domain/interfaces/storage.service.interface';
import { DocumentStatus } from '../../domain/enum/document-status.enum';
import { DocumentNotFoundException } from '../../domain/exceptions/document-not-found.exception';
import { UnauthorizedDocumentAccessException } from '../../domain/exceptions/unauthorized-document-access.exception';
import { DocumentAlreadyArchivedException } from '../../domain/exceptions/document-already-archived.exception';

@Injectable()
export class GetDocumentLinkUseCase {
  constructor(
    @Inject('IDocumentRepository')
    private readonly documentRepository: IDocumentRepository,
    @Inject('IStorageService')
    private readonly storageService: IStorageService,
  ) {}

  async execute(documentId: string, currentUserId?: string): Promise<string> {
    const document = await this.documentRepository.findById(documentId);

    if (!document) throw new DocumentNotFoundException();
    if (document.isDeleted()) throw new DocumentAlreadyArchivedException();

    const isOwner = currentUserId
      ? document.getAuthorId() === currentUserId
      : false;

    const isPublished = document.getStatus() === DocumentStatus.PUBLISHED;

    if (!isPublished && !isOwner) {
      throw new UnauthorizedDocumentAccessException();
    }

    const signedUrl = await this.storageService.getSignedUrl(
      document.getFileKey(),
    );

    return signedUrl;
  }
}
