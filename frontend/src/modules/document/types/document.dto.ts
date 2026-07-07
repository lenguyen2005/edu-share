export type DocumentStatus = "DRAFT" | "PUBLISHED";

export interface UserSummaryDto {
  id: string;
  fullName: string;
}

export interface DocumentDto {
  id: string;
  title: string;
  description?: string;
  status: DocumentStatus;

  author: UserSummaryDto;

  categoryId: string;

  createdAt: string;
  updatedAt: string;
}