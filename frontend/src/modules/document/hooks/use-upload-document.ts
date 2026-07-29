import { useMutation } from '@tanstack/react-query';
import { documentApi } from '../api/document.api';
import { CreateDocumentPayload } from '../types/create-document-payload.type';
// Import documentQueryKeys tuỳ thuộc vào cách bạn định nghĩa ở types/document-query-key.ts

interface UploadVariables {
  file: File;
  metadata: Omit<CreateDocumentPayload, 'fileKey'>; // Gồm title, description, categoryId...
  onProgress?: (progress: number) => void; // Hàm callback để render thanh tiến trình
}

export const useUploadDocument = () => {

  return useMutation({
    mutationFn: async ({ file, metadata, onProgress }: UploadVariables) => {
      // BƯỚC 1: Lấy URL và fileKey
      const urlResponse = await documentApi.getUploadUrl({
        fileName: file.name,
        contentType: file.type,
      });
      // (Lưu ý: Truy xuất .data tuỳ thuộc vào cấu trúc response interceptor của axiosClient)
      const { uploadUrl, fileKey } = urlResponse.data.data;

      // BƯỚC 2: Upload file vật lý lên AWS S3
      await documentApi.uploadToS3(uploadUrl, file, onProgress);

      // BƯỚC 3: Lưu Metadata vào Database NestJS
      const createResponse = await documentApi.createDocument({
        ...metadata,
        fileKey,
      });

      return createResponse.data.data;
    },
    onSuccess: () => {
      // Invalidate cache để danh sách tự động cập nhật
      // queryClient.invalidateQueries({ queryKey: documentQueryKeys.lists() });
    },
    onError: (error) => {
      console.error('Lỗi khi tải tài liệu:', error);
    }
  });
};