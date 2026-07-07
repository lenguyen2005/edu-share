import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { documentApi } from "../api/document.api";
import { DOCUMENT_QUERY_KEYS } from "../types/document-query-key";
import { UploadDocumentPayload } from "../types/upload-document-payload.type";

export function useUploadDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UploadDocumentPayload) => {
      const formData = new FormData();

      formData.append("title", payload.title);

      if (payload.description) {
        formData.append("description", payload.description);
      }

      formData.append("categoryId", payload.categoryId);
      formData.append("status", payload.status);
      formData.append("file", payload.file);

      const { data } = await documentApi.upload(formData);

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DOCUMENT_QUERY_KEYS.lists(),
      });

      toast.success("Tải lên tài liệu thành công!");
    },

    onError: (error) => {
      const axiosError = error as AxiosError<{ message?: string }>;

      toast.error(
        axiosError.response?.data?.message ??
          "Có lỗi xảy ra khi tải lên tài liệu."
      );
    },
  });
}