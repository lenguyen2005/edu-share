export interface CommentTree {
  id: string;

  content: string;

  documentId: string;

  userId: string;

  userFullName: string;

  parentId: string | null;

  isResolved: boolean;

  createdAt: string;

  replies: CommentTree[];
}