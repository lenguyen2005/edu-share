export interface UploadDocumentPayload {
  title: string;
  description?: string;
  categoryId: string;
  file: File;
  status: string;
}