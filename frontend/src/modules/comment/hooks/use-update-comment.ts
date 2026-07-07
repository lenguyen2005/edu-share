import { useMutation, useQueryClient } from "@tanstack/react-query";

import { commentApi } from "../api/comment.api";

import { COMMENT_QUERY_KEYS } from "../constants/comment-query-key";

import { toast } from "sonner";

import type { UpdateCommentDto } from "../dto/update-comment.dto";

interface UpdateVariables {
  commentId: string;

  documentId: string;

  dto: UpdateCommentDto;
}

export function useUpdateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, dto }: UpdateVariables) =>
      commentApi.update(commentId, dto),

    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: COMMENT_QUERY_KEYS.byDocument(
          variables.documentId,
        ),
      });
      toast.success("Comment updated.");
    },
    onError() {

        toast.error("Failed to update comment.");

    },
  });
}