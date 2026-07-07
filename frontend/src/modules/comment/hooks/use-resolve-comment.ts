import { useMutation, useQueryClient } from "@tanstack/react-query";

import { commentApi } from "../api/comment.api";

import { COMMENT_QUERY_KEYS } from "../constants/comment-query-key";

import { toast } from "sonner";

interface ResolveVariables {
  commentId: string;

  documentId: string;
}

export function useResolveComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId }: ResolveVariables) =>
      commentApi.resolve(commentId),

    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: COMMENT_QUERY_KEYS.byDocument(
          variables.documentId,
        ),
      });
      toast.success("Comment resolved.");
    },
    onError() {

        toast.error("Failed to resolve comment.");

    },
  });
}