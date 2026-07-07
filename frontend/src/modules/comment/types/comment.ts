export interface Comment {
  id: string;

  content: string;

  documentId: string;

  userId: string;

  parentId: string | null;

  isResolved: boolean;

  createdAt: string;

  replies: Comment[];
}