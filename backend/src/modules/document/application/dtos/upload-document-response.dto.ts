export class UploadDocumentResponseDto {
  id: string;
  title: string;
  description: string | null;
  fileKey: string;
  createdAt: Date;
}
