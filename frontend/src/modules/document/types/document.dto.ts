export type DocumentStatus = "DRAFT" | "PUBLISHED";

export interface DocumentDto {
  id: string;
  title: string;
  description: string | null;
  fileKey: string;
  authorId: string;
  categoryId: string;
  status: DocumentStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}