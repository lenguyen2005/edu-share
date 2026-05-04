import { useState } from 'react';
import { documentApi } from '../api/document.api';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { UploadDocumentPayload } from '../types/upload-document-payload.type';

export const useUploadDocument = () => {
  const [isUploading, setIsUploading] = useState(false);

  const upload = async (data: UploadDocumentPayload): Promise<boolean> => {
    const formData = new FormData();
    formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    formData.append('categoryId', data.categoryId);
    formData.append('file', data.file);
    formData.append('status', data.status);

    setIsUploading(true);
    try {
      await documentApi.upload(formData);
      toast.success('Tải lên tài liệu thành công!');
      return true;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error.response?.data?.message || 'Lỗi khi tải lên');
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  return { upload, isUploading };
};