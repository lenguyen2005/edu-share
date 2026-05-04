import { DocumentDto } from "./document.dto";

export interface GetDocumentsResponse {
  items: DocumentDto[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}