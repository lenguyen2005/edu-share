export interface CommentTreeDto {
  id: string;

  content: string;

  documentId: string;

  userId: string;

  userFullName: string;

  parentId: string | null;

  isResolved: boolean;

  createdAt: Date;

  replies: CommentTreeDto[];
}
