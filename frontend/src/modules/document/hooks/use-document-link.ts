import { useQuery } from "@tanstack/react-query";

import { documentApi } from "../api/document.api";

export function useDocumentLink(documentId: string) {
  return useQuery({
    queryKey: ["document-link", documentId],

    queryFn: async () => {
      const { data } =
        await documentApi.getDownloadLink(documentId);

      return data.data.url as string;
    },

    enabled: Boolean(documentId),
  });
}