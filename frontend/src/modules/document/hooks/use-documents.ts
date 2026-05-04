import { useQuery } from "@tanstack/react-query";
import { documentApi } from "../api/document.api";
import { GetDocumentsParams } from "../types/get-documents.params";

export const useDocuments = (params: GetDocumentsParams) => {
  return useQuery({
    queryKey: ["documents", params],
    queryFn: async () => {
      const res = await documentApi.getDocuments(params);
      return res.data;
    },
    placeholderData: (previousData) => previousData,
  });
};