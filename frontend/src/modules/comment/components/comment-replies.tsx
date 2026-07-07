import type { CommentTree } from "../types/comment-tree";

import { CommentItem } from "./comment-item";

interface CommentRepliesProps {
  comments: CommentTree[];

  currentUserId?: string;

  onReply(
    commentId: string,
    content: string,
  ): void;

  onUpdate(
    commentId: string,
    content: string,
  ): void;

  onDelete(
    commentId: string,
  ): void;

  onResolve(
    commentId: string,
  ): void;
}

export function CommentReplies({
  comments,
  currentUserId,
  onReply,
  onUpdate,
  onDelete,
  onResolve,
}: CommentRepliesProps) {
  if (comments.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 ml-8 flex flex-col gap-4 border-l border-gray-200 pl-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUserId={currentUserId}
          onReply={onReply}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onResolve={onResolve}
        />
      ))}
    </div>
  );
}