import { useMutation, useQueryClient } from "@tanstack/react-query";

import { commentApi } from "../api/comment.api";

import { COMMENT_QUERY_KEYS } from "../constants/comment-query-key";

import { toast } from "sonner";

import type { ReplyCommentDto } from "../dto/reply-comment.dto";

interface ReplyVariables {
  commentId: string;

  documentId: string;

  dto: ReplyCommentDto;
}

export function useReplyComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, dto }: ReplyVariables) =>
      commentApi.reply(commentId, dto),

    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: COMMENT_QUERY_KEYS.byDocument(
          variables.documentId,
        ),
      });
      toast.success("Reply created.");
    },

    onError() {

        toast.error("Failed to reply.");

    },
  });
}