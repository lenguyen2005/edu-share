import axiosClient from '@/shared/api/axios-client';
import { GetDocumentsParams } from '../types/get-documents.params';
import { DocumentDto } from '../types/document.dto';

const DOCUMENT_ENDPOINT = '/documents';

export const documentApi = {
  getDocuments: (params: GetDocumentsParams) => axiosClient.get('/documents', { params }),
  
  upload: (formData: FormData) => axiosClient.post('/documents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),

  getById: (id: string) =>
    axiosClient.get<DocumentDto>(`${DOCUMENT_ENDPOINT}/${id}`),

  delete: (id: string) =>
    axiosClient.delete(`${DOCUMENT_ENDPOINT}/${id}`),


  getDownloadLink: (id: string) => axiosClient.get(`/documents/${id}/download-link`),

  publish: (id: string) => axiosClient.patch(`/documents/${id}/publish`)
};