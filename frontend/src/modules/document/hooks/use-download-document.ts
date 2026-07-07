import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { documentApi } from "../api/document.api";

export function useDownloadDocument() {
  return useMutation({
    mutationFn: (id: string) =>
      documentApi.getDownloadLink(id),

    onSuccess(res) {
      const { url } = res.data.data;

      window.open(url, "_blank");
    },

    onError() {
      toast.error(
        "Bạn không có quyền tải tài liệu này hoặc liên kết đã hết hạn.",
      );
    },
  });
}