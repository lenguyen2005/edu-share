import { useQuery } from "@tanstack/react-query";

import { documentApi } from "../api/document.api";
import { DOCUMENT_QUERY_KEYS } from "../types/document-query-key";

export function useDocument(id: string) {
  return useQuery({
    queryKey: DOCUMENT_QUERY_KEYS.detail(id),

    queryFn: async () => {
      const { data } = await documentApi.getById(id);
      return data;
    },

    enabled: Boolean(id),
  });
}