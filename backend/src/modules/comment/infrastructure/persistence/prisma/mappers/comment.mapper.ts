import { Comment } from '@prisma/client';
import { CommentEntity } from 'src/modules/comment/domain/entities/comment.entity';

export class CommentMapper {
  static toDomain(model: Comment): CommentEntity {
    return new CommentEntity({
      id: model.id,
      content: model.content,
      isResolved: model.isResolved,
      documentId: model.documentId,
      userId: model.userId,
      parentId: model.parentId,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }
}
