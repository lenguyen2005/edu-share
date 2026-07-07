export interface DocumentSummaryQuery {
  id: string;

  title: string;

  description?: string;

  status: string;

  categoryId: string;

  createdAt: Date;

  updatedAt: Date;

  author: {
    id: string;
    fullName: string;
  };
}
