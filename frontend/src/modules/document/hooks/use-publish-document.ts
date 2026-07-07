import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { documentApi } from "../api/document.api";

export function usePublishDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => documentApi.publish(id),

    onSuccess() {
      toast.success("Tài liệu đã được công khai!");

      queryClient.invalidateQueries({
        queryKey: ["documents"],
      });
    },

    onError() {
      toast.error("Không thể công khai tài liệu.");
    },
  });
}