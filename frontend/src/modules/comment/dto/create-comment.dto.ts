export interface CreateCommentDto {
  content: string;
  documentId: string;
  parentId?: string;
}