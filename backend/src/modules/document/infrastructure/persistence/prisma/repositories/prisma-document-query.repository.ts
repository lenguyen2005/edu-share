import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/shared/database/prisma/prisma.service';

import { GetDocumentsQueryDto } from 'src/modules/document/application/dtos/get-documents-query.dto';
import { DocumentSummaryQuery } from 'src/modules/document/application/queries/document-summary.query';

import { IDocumentQueryRepository } from 'src/modules/document/domain/interfaces/document-query.repository.interface';

import { DocumentStatus } from '@prisma/client';

@Injectable()
export class PrismaDocumentQueryRepository implements IDocumentQueryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    filters: GetDocumentsQueryDto & {
      skip: number;
      take: number;
      currentUserId?: string;
    },
  ): Promise<[DocumentSummaryQuery[], number]> {
    const baseWhere = {
      deletedAt: null,

      ...(filters.categoryId && {
        categoryId: filters.categoryId,
      }),

      ...(filters.search && {
        title: {
          contains: filters.search,
          mode: 'insensitive' as const,
        },
      }),
    };

    const where = !filters.currentUserId
      ? {
          ...baseWhere,
          status: DocumentStatus.PUBLISHED,
        }
      : {
          ...baseWhere,
          OR: [
            {
              status: DocumentStatus.PUBLISHED,
            },
            {
              authorId: filters.currentUserId,
            },
          ],
        };

    const [documents, total] = await Promise.all([
      this.prisma.document.findMany({
        where,

        skip: filters.skip,
        take: filters.take,

        orderBy: {
          createdAt: 'desc',
        },

        include: {
          author: {
            select: {
              id: true,
              fullName: true,
            },
          },
        },
      }),

      this.prisma.document.count({
        where,
      }),
    ]);

    return [
      documents.map((doc) => ({
        id: doc.id,
        title: doc.title,
        description: doc.description ?? undefined,
        status: doc.status,
        categoryId: doc.categoryId,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,

        author: {
          id: doc.author.id,
          fullName: doc.author.fullName,
        },
      })),

      total,
    ];
  }
}
