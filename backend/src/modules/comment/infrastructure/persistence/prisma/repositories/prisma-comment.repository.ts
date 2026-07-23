import { Injectable } from '@nestjs/common';

import { PrismaDbContext } from 'src/shared/database/prisma/prisma-db-context';

import { CommentEntity } from 'src/modules/comment/domain/entities/comment.entity';
import { CommentRepository } from 'src/modules/comment/domain/interfaces/comment.repository.interface';

import { CommentMapper } from '../mappers/comment.mapper';
import { BasePrismaRepository } from 'src/shared/database/prisma/base-prisma.repository';

@Injectable()
export class PrismaCommentRepository
  extends BasePrismaRepository
  implements CommentRepository
{
  constructor(db: PrismaDbContext) {
    super(db);
  }

  async create(comment: CommentEntity): Promise<CommentEntity> {
    const created = await this.prisma.comment.create({
      data: {
        id: comment.id,
        content: comment.content,
        isResolved: comment.isResolved,
        documentId: comment.documentId,
        userId: comment.userId,
        parentId: comment.parentId,
      },
    });

    return CommentMapper.toDomain(created);
  }

  async update(comment: CommentEntity): Promise<CommentEntity> {
    const updated = await this.prisma.comment.update({
      where: {
        id: comment.id,
      },

      data: {
        content: comment.content,
        isResolved: comment.isResolved,
        updatedAt: comment.updatedAt,
      },
    });

    return CommentMapper.toDomain(updated);
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.comment.update({
      where: {
        id,
      },

      data: {
        deletedAt: new Date(),
      },
    });
  }

  async findById(id: string): Promise<CommentEntity | null> {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    });

    return comment ? CommentMapper.toDomain(comment) : null;
  }

  async findActiveById(id: string): Promise<CommentEntity | null> {
    const comment = await this.prisma.comment.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    return comment ? CommentMapper.toDomain(comment) : null;
  }

  async findActiveByDocumentId(documentId: string): Promise<CommentEntity[]> {
    const comments = await this.prisma.comment.findMany({
      where: {
        documentId,
        deletedAt: null,
      },

      orderBy: {
        createdAt: 'asc',
      },
    });

    return comments.map((comment) => CommentMapper.toDomain(comment));
  }
}
