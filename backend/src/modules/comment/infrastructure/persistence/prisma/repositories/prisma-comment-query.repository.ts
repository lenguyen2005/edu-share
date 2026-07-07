import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/shared/database/prisma/prisma.service';

import { ICommentQueryRepository } from 'src/modules/comment/domain/interfaces/comment-query.repository.interface';
import { CommentTreeDto } from 'src/modules/comment/application/dtos/comment-tree.dto';

@Injectable()
export class PrismaCommentQueryRepository implements ICommentQueryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findTreeByDocumentId(documentId: string): Promise<CommentTreeDto[]> {
    const comments = await this.prisma.comment.findMany({
      where: {
        documentId,
        deletedAt: null,
      },

      include: {
        user: {
          select: {
            fullName: true,
          },
        },
      },

      orderBy: {
        createdAt: 'asc',
      },
    });

    const map = new Map<string, CommentTreeDto>();

    const roots: CommentTreeDto[] = [];

    for (const comment of comments) {
      map.set(comment.id, {
        id: comment.id,
        content: comment.content,
        documentId: comment.documentId,
        userId: comment.userId,
        userFullName: comment.user.fullName,
        parentId: comment.parentId,
        isResolved: comment.isResolved,
        createdAt: comment.createdAt,
        replies: [],
      });
    }

    for (const comment of comments) {
      const node = map.get(comment.id)!;

      if (!comment.parentId) {
        roots.push(node);
        continue;
      }

      const parent = map.get(comment.parentId);

      if (parent) {
        parent.replies.push(node);
      }
    }

    return roots;
  }
}
