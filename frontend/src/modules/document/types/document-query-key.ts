import { GetDocumentsParams } from "../types/get-documents.params";

export const DOCUMENT_QUERY_KEYS = {
  all: ["documents"] as const,

  lists: () => [...DOCUMENT_QUERY_KEYS.all, "list"] as const,

  list: (params: GetDocumentsParams) =>
    [...DOCUMENT_QUERY_KEYS.lists(), params] as const,

  details: () => [...DOCUMENT_QUERY_KEYS.all, "detail"] as const,

  detail: (id: string) =>
    [...DOCUMENT_QUERY_KEYS.details(), id] as const,
};