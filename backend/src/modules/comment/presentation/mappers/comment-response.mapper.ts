import { CommentEntity } from '../../domain/entities/comment.entity';
import { CommentResponse } from '../dtos/comment.response';

export class CommentResponseMapper {
  static toResponse(entity: CommentEntity): CommentResponse {
    return {
      id: entity.id,
      content: entity.content,
      isResolved: entity.isResolved,
      userId: entity.userId,
      documentId: entity.documentId,
      parentId: entity.parentId,
      createdAt: entity.createdAt,
    };
  }
}
