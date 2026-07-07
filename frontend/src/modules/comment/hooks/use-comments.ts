import { useQuery } from "@tanstack/react-query";

import { commentApi } from "../api/comment.api";
import { COMMENT_QUERY_KEYS } from "../constants/comment-query-key";

export function useComments(documentId: string) {
  return useQuery({
    queryKey: COMMENT_QUERY_KEYS.byDocument(documentId),

    queryFn: () =>
      commentApi.getDocumentComments(documentId),

    enabled: !!documentId,
  });
}