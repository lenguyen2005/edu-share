import { Injectable, Inject } from '@nestjs/common';
import { IDocumentRepository } from '../../domain/interfaces/document.repository.interface';
import { IStorageService } from '../../domain/interfaces/storage.service.interface';
import { DocumentEntity } from '../../domain/entities/document.entity';
import { UploadDocumentDto } from '../dtos/upload-document.dto';
import { v4 as uuidv4 } from 'uuid';
import { DocumentStatus } from '../../domain/enum/document-status.enum';

@Injectable()
export class UploadDocumentUseCase {
  constructor(
    @Inject('IDocumentRepository')
    private readonly documentRepository: IDocumentRepository,
    @Inject('IStorageService')
    private readonly storageService: IStorageService,
  ) {}

  async execute(
    dto: UploadDocumentDto,
    file: Express.Multer.File,
    authorId: string,
  ) {
    const fileKey = `docs/${uuidv4()}-${file.originalname}`;

    await this.storageService.upload(file, fileKey);

    const document = DocumentEntity.create({
      id: uuidv4(),
      title: dto.title,
      description: dto.description || null,
      fileKey,
      authorId,
      categoryId: dto.categoryId,
      status: dto.status || DocumentStatus.DRAFT,
    });

    const savedDocument = await this.documentRepository.create(document);

    return {
      id: savedDocument.id,
      title: savedDocument.getTitle(),
      description: savedDocument.getDescription(),
      fileKey: savedDocument.getFileKey(),
      status: savedDocument.getStatus(), // Trả về thêm status để frontend biết
      createdAt: savedDocument.getCreatedAt(),
    };
  }
}
