export interface CreateDocumentPayload {
  title: string;
  description?: string;
  categoryId: string;
  status?: string; 
  fileKey: string;
}