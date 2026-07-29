import { Injectable, Inject } from '@nestjs/common';
import { IDocumentRepository } from '../../domain/interfaces/document.repository.interface';
import { DocumentEntity } from '../../domain/entities/document.entity';
import { UploadDocumentDto } from '../dtos/upload-document.dto';
import { v4 as uuidv4 } from 'uuid';
import { DocumentStatus } from '../../domain/enum/document-status.enum';
import { EventBus } from '@nestjs/cqrs';
import { DocumentUploadedEvent } from '../events/document-uploaded.event';

@Injectable()
export class CreateDocumentUseCase {
  constructor(
    @Inject('IDocumentRepository')
    private readonly documentRepository: IDocumentRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(dto: UploadDocumentDto, authorId: string) {
    const document = DocumentEntity.create({
      id: uuidv4(),
      title: dto.title,
      description: dto.description || null,
      fileKey: dto.fileKey,
      authorId,
      categoryId: dto.categoryId,
      status: dto.status || DocumentStatus.DRAFT,
    });

    const savedDocument = await this.documentRepository.create(document);

    this.eventBus.publish(
      new DocumentUploadedEvent(document.id, document.getAuthorId()),
    );

    return {
      id: savedDocument.id,
      title: savedDocument.getTitle(),
      description: savedDocument.getDescription(),
      fileKey: savedDocument.getFileKey(),
      status: savedDocument.getStatus(),
      createdAt: savedDocument.getCreatedAt(),
    };
  }
}
