import axiosClient from '@/shared/api/axios-client';
import { GetDocumentsParams } from '../types/get-documents.params';

export const documentApi = {
  getDocuments: (params: GetDocumentsParams) => axiosClient.get('/documents', { params }),
  
  upload: (formData: FormData) => axiosClient.post('/documents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),

  getDownloadLink: (id: string) => axiosClient.get(`/documents/${id}/download-link`)
};