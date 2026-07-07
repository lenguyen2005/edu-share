import { useMutation, useQueryClient } from "@tanstack/react-query";

import { commentApi } from "../api/comment.api";

import { COMMENT_QUERY_KEYS } from "../constants/comment-query-key";

import { toast } from "sonner";

interface DeleteVariables {
  commentId: string;

  documentId: string;
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId }: DeleteVariables) =>
      commentApi.delete(commentId),

    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: COMMENT_QUERY_KEYS.byDocument(
          variables.documentId,
        ),
      });
      toast.success("Comment deleted.");
    },
    onError() {

        toast.error("Failed to delete comment.");

    },
  });
}