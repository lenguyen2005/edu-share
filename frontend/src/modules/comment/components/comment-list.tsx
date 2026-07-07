import type { CommentTree } from "../types/comment-tree";

import { CommentItem } from "./comment-item";

interface CommentListProps {
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

export function CommentList({
  comments,
  currentUserId,
  onReply,
  onUpdate,
  onDelete,
  onResolve,
}: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="rounded-md border border-dashed p-6 text-center text-gray-500">
        No comments yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
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