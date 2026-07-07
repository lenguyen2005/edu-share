import { useMutation, useQueryClient } from "@tanstack/react-query";

import { commentApi } from "../api/comment.api";
import { COMMENT_QUERY_KEYS } from "../constants/comment-query-key";
import { toast } from "sonner";

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentApi.create,

    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: COMMENT_QUERY_KEYS.byDocument(
          variables.documentId,
        ),
      });
      toast.success("Comment created successfully.");
    },
    onError() {
        toast.error("Failed to create comment.");
    },
  });
}