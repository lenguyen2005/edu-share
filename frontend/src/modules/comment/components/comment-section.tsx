import { CommentInput } from "./comment-input";
import { CommentList } from "./comment-list";

import { useComments } from "../hooks/use-comments";
import { useCreateComment } from "../hooks/use-create-comment";
import { useReplyComment } from "../hooks/use-reply-comment";
import { useUpdateComment } from "../hooks/use-update-comment";
import { useDeleteComment } from "../hooks/use-delete-comment";
import { useResolveComment } from "../hooks/use-resolve-comment";

interface CommentSectionProps {
  documentId: string;

  currentUserId?: string;
}

export function CommentSection({
  documentId,
  currentUserId,
}: CommentSectionProps) {
  const {
    data,
    isLoading,
    isError,
  } = useComments(documentId);

  const createComment = useCreateComment();

  const replyComment = useReplyComment();

  const updateComment = useUpdateComment();

  const deleteComment = useDeleteComment();

  const resolveComment = useResolveComment();

  if (isLoading) {
    return (
      <div className="p-4">
        Loading comments...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-red-600">
        Failed to load comments.
      </div>
    );
  }

  const comments = data?.data ?? [];

  return (
    <div className="flex flex-col gap-6">
      <CommentInput
        placeholder="Write a comment..."
        submitText="Comment"
        loading={createComment.isPending}
        onSubmit={(content) =>
          createComment.mutate({
            documentId,
            content,
          })
        }
      />

      <CommentList
        comments={comments}
        currentUserId={currentUserId}
        onReply={(commentId, content) =>
          replyComment.mutate({
            commentId,
            documentId,
            dto: {
              content,
              documentId,
            },
          })
        }
        onUpdate={(commentId, content) =>
          updateComment.mutate({
            commentId,
            documentId,
            dto: {
              content,
            },
          })
        }
        onDelete={(commentId) =>
          deleteComment.mutate({
            commentId,
            documentId,
          })
        }
        onResolve={(commentId) =>
          resolveComment.mutate({
            commentId,
            documentId,
          })
        }
      />
    </div>
  );
}