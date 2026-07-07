export class CommentTreeResponse {
  id: string;

  content: string;

  isResolved: boolean;

  userId: string;

  createdAt: Date;

  replies: CommentTreeResponse[];
}
