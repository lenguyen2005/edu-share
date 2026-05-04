import { GetDocumentsUseCase } from './application/use-cases/get-documents.use-case';
import { Module } from '@nestjs/common';
import { DocumentController } from './presentation/controllers/document.controller';
import { UploadDocumentUseCase } from './application/use-cases/upload-document.use-case';
import { PrismaDocumentRepository } from './infrastructure/persistence/prisma/repositories/prisma-document.repository';
import { S3StorageService } from './infrastructure/storage/s3-storage.service';
import { GetDocumentLinkUseCase } from './application/use-cases/get-document-link.use-case';
import { ArchiveDocumentUseCase } from './application/use-cases/archive-document.use-case';
import { PublishDocumentUseCase } from './application/use-cases/publish-document.use-case';

@Module({
  controllers: [DocumentController],
  providers: [
    UploadDocumentUseCase,
    GetDocumentLinkUseCase,
    ArchiveDocumentUseCase,
    GetDocumentsUseCase,
    PublishDocumentUseCase,
    {
      provide: 'IDocumentRepository',
      useClass: PrismaDocumentRepository,
    },
    {
      provide: 'IStorageService',
      useClass: S3StorageService,
    },
  ],
})
export class DocumentModule {}
