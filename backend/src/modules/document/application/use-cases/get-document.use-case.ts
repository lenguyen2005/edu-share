import { Inject, Injectable } from '@nestjs/common';

import { IDocumentRepository } from '../../domain/interfaces/document.repository.interface';
import { DocumentStatus } from '../../domain/enum/document-status.enum';

import { GetDocumentQuery } from '../queries/get-document.query';

import { DocumentNotFoundException } from '../../domain/exceptions/document-not-found.exception';
import { DocumentAlreadyArchivedException } from '../../domain/exceptions/document-already-archived.exception';
import { UnauthorizedDocumentAccessException } from '../../domain/exceptions/unauthorized-document-access.exception';
import { IUserRepository } from 'src/modules/auth/domain/interfaces/user.repository.interface';
import { DocumentResponse } from '../../presentation/responses/document.response';
import { UserNotFoundException } from 'src/modules/auth/domain/exceptions/user-not-found.exception';

@Injectable()
export class GetDocumentUseCase {
  constructor(
    @Inject('IDocumentRepository')
    private readonly documentRepository: IDocumentRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(query: GetDocumentQuery): Promise<DocumentResponse> {
    const document = await this.documentRepository.findById(query.documentId);

    if (!document) {
      throw new DocumentNotFoundException();
    }

    if (document.isDeleted()) {
      throw new DocumentAlreadyArchivedException();
    }

    const isOwner =
      query.currentUserId !== undefined &&
      document.getAuthorId() === query.currentUserId;

    const isPublished = document.getStatus() === DocumentStatus.PUBLISHED;

    if (!isPublished && !isOwner) {
      throw new UnauthorizedDocumentAccessException();
    }

    const author = await this.userRepository.findById(document.getAuthorId());

    if (!author) {
      throw new UserNotFoundException();
    }

    return DocumentResponse.fromEntity(document, author);
  }
}
