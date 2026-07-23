export class CommentResponse {
  id: string;

  content: string;

  isResolved: boolean;

  userId: string;

  documentId: string;

  parentId: string | null;

  createdAt: Date;
}
