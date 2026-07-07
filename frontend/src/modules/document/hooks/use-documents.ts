import { useQuery } from "@tanstack/react-query";

import { documentApi } from "../api/document.api";
import { DOCUMENT_QUERY_KEYS } from "../types/document-query-key";
import { GetDocumentsParams } from "../types/get-documents.params";

export function useDocuments(params: GetDocumentsParams) {
  return useQuery({
    queryKey: DOCUMENT_QUERY_KEYS.list(params),

    queryFn: async () => {
      const { data } = await documentApi.getDocuments(params);
      return data;
    },

    placeholderData: (previousData) => previousData,
  });
}