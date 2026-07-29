import axios from 'axios'; // Import axios gốc cho tác vụ gọi S3
import axiosClient from '@/shared/api/axios-client';
import { GetDocumentsParams } from '../types/get-documents.params';
import { DocumentDto } from '../types/document.dto';
import { CreateDocumentPayload } from '../types/create-document-payload.type';

const DOCUMENT_ENDPOINT = '/documents';

export const documentApi = {
  getDocuments: (params: GetDocumentsParams) => axiosClient.get(DOCUMENT_ENDPOINT, { params }),

  // BƯỚC 1: Gọi API xin URL cấp phép tải lên
  getUploadUrl: (payload: { fileName: string; contentType: string }) => 
    axiosClient.post(`${DOCUMENT_ENDPOINT}/upload-url`, payload),

  // BƯỚC 2: Tải thẳng file lên S3 bằng axios gốc
  uploadToS3: (uploadUrl: string, file: File, onProgress?: (progress: number) => void) => 
    axios.put(uploadUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      }
    }),

  // BƯỚC 3: Lưu thông tin meta vào Database
  createDocument: (payload: CreateDocumentPayload) => 
    axiosClient.post(DOCUMENT_ENDPOINT, payload),

  getById: (id: string) =>
    axiosClient.get<DocumentDto>(`${DOCUMENT_ENDPOINT}/${id}`),

  delete: (id: string) =>
    axiosClient.delete(`${DOCUMENT_ENDPOINT}/${id}`),

  getDownloadLink: (id: string) => 
    axiosClient.get(`${DOCUMENT_ENDPOINT}/${id}/download-link`),

  publish: (id: string) => 
    axiosClient.patch(`${DOCUMENT_ENDPOINT}/${id}/publish`)
};