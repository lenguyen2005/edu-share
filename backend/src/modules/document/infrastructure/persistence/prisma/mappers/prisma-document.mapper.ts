import { Document as PrismaDocument } from '@prisma/client';
import { DocumentEntity } from '../../../../domain/entities/document.entity';
import { DocumentStatus } from '../../../../domain/enum/document-status.enum';
import { Title } from 'src/modules/document/domain/value-objects/title.vo';
import { DocumentStatus as PrismaStatus } from '@prisma/client';

export class PrismaDocumentMapper {
  static toDomain(raw: PrismaDocument): DocumentEntity {
    return new DocumentEntity(
      raw.id,
      new Title(raw.title),
      raw.description,
      raw.fileKey,
      raw.authorId,
      raw.categoryId,
      this.mapStatusToDomain(raw.status),
      raw.createdAt,
      raw.updatedAt,
      raw.deletedAt,
    );
  }

  static toPrismaCreate(domain: DocumentEntity) {
    return {
      id: domain.id,
      title: domain.getTitle(),
      description: domain.getDescription(),
      fileKey: domain.getFileKey(),
      authorId: domain.getAuthorId(),
      categoryId: domain.getCategoryId(),
      status: this.mapStatusToPrisma(domain.getStatus()),
    };
  }

  static toPrismaUpdate(domain: DocumentEntity) {
    return {
      title: domain.getTitle(),
      description: domain.getDescription(),
      fileKey: domain.getFileKey(),
      categoryId: domain.getCategoryId(),
      status: this.mapStatusToPrisma(domain.getStatus()),
      updatedAt: domain.getUpdatedAt(),
      deletedAt: domain.getDeletedAt(),
    };
  }

  private static mapStatusToDomain(status: PrismaStatus): DocumentStatus {
    switch (status) {
      case PrismaStatus.DRAFT:
        return DocumentStatus.DRAFT;
      case PrismaStatus.PUBLISHED:
        return DocumentStatus.PUBLISHED;
      default:
        throw new Error(`Invalid status: ${status}`);
    }
  }

  private static mapStatusToPrisma(status: DocumentStatus): PrismaStatus {
    switch (status) {
      case DocumentStatus.DRAFT:
        return PrismaStatus.DRAFT;
      case DocumentStatus.PUBLISHED:
        return PrismaStatus.PUBLISHED;
      default:
        throw new Error(`Invalid status: ${status}`);
    }
  }
}
