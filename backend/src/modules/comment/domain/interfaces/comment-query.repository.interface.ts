import { CommentTreeDto } from '../../application/dtos/comment-tree.dto';

export interface ICommentQueryRepository {
  findTreeByDocumentId(documentId: string): Promise<CommentTreeDto[]>;
}
