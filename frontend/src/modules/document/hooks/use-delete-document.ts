import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { documentApi } from "../api/document.api";
import { DOCUMENT_QUERY_KEYS } from "../types/document-query-key";

export function useDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await documentApi.delete(id);
      return data;
    },

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: DOCUMENT_QUERY_KEYS.lists(),
      });

      queryClient.removeQueries({
        queryKey: DOCUMENT_QUERY_KEYS.detail(id),
      });

      toast.success("Document deleted successfully.");
    },

    onError: () => {
      toast.error("Failed to delete document.");
    },
  });
}