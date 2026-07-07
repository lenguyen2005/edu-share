import { CommentEntity } from '../entities/comment.entity';

export abstract class CommentRepository {
  abstract create(comment: CommentEntity): Promise<CommentEntity>;

  abstract update(comment: CommentEntity): Promise<CommentEntity>;

  abstract softDelete(id: string): Promise<void>;

  abstract findById(id: string): Promise<CommentEntity | null>;

  abstract findActiveById(id: string): Promise<CommentEntity | null>;

  abstract findActiveByDocumentId(documentId: string): Promise<CommentEntity[]>;
}
