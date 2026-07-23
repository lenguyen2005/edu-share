import { Injectable } from '@nestjs/common';
import { PrismaDbContext } from 'src/shared/database/prisma/prisma-db-context';
import {
  IDocumentRepository,
  DocumentFilters,
} from '../../../../domain/interfaces/document.repository.interface';
import { DocumentEntity } from '../../../../domain/entities/document.entity';
import { PrismaDocumentMapper } from '../mappers/prisma-document.mapper';
import { BasePrismaRepository } from 'src/shared/database/prisma/base-prisma.repository';

@Injectable()
export class PrismaDocumentRepository
  extends BasePrismaRepository
  implements IDocumentRepository
{
  constructor(db: PrismaDbContext) {
    super(db);
  }

  async create(document: DocumentEntity): Promise<DocumentEntity> {
    const data = PrismaDocumentMapper.toPrismaCreate(document);

    const created = await this.prisma.document.create({
      data,
    });

    return PrismaDocumentMapper.toDomain(created);
  }

  async update(document: DocumentEntity): Promise<DocumentEntity> {
    const data = PrismaDocumentMapper.toPrismaUpdate(document);

    const updated = await this.prisma.document.update({
      where: { id: document.id },
      data,
    });

    return PrismaDocumentMapper.toDomain(updated);
  }

  async findById(id: string): Promise<DocumentEntity | null> {
    const document = await this.prisma.document.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!document) return null;

    return PrismaDocumentMapper.toDomain(document);
  }

  async findByOwner(authorId: string): Promise<DocumentEntity[]> {
    const documents = await this.prisma.document.findMany({
      where: {
        authorId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return documents.map((doc) => PrismaDocumentMapper.toDomain(doc));
  }

  async findAll(
    filters?: DocumentFilters,
  ): Promise<[DocumentEntity[], number]> {
    const baseWhere = {
      deletedAt: null,
      ...(filters?.categoryId && { categoryId: filters.categoryId }),
      ...(filters?.search && {
        title: {
          contains: filters.search,
          mode: 'insensitive' as const,
        },
      }),
    };

    let where;

    if (!filters?.currentUserId) {
      where = {
        ...baseWhere,
        status: 'PUBLISHED',
      };
    } else {
      where = {
        ...baseWhere,
        OR: [{ status: 'PUBLISHED' }, { authorId: filters.currentUserId }],
      };
    }

    const [documents, total] = await Promise.all([
      this.prisma.document.findMany({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        where,
        skip: filters?.skip,
        take: filters?.take,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.prisma.document.count({ where }),
    ]);

    return [documents.map((doc) => PrismaDocumentMapper.toDomain(doc)), total];
  }

  async delete(id: string): Promise<void> {
    await this.prisma.document.update({
      where: { id },
      data: {
        deletedAt: new Date(), // soft delete
      },
    });
  }

  async findWithDeleted(id: string): Promise<DocumentEntity | null> {
    const document = await this.prisma.document.findUnique({ where: { id } });
    if (!document) return null;
    return PrismaDocumentMapper.toDomain(document);
  }
}
