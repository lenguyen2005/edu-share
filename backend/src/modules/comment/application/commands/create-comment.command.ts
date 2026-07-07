export interface CreateCommentCommand {
  content: string;
  documentId: string;
  userId: string;
  parentId?: string;
}
