import { useState } from "react";

import type { CommentTree } from "../types/comment-tree";

import { CommentHeader } from "./comment-header";
import { CommentActions } from "./comment-actions";
import { CommentInput } from "./comment-input";
import { CommentReplies } from "./comment-replies";

interface CommentItemProps {
  comment: CommentTree;

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

export function CommentItem({
  comment,
  currentUserId,
  onReply,
  onUpdate,
  onDelete,
  onResolve,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [isReplying, setIsReplying] = useState(false);

  const isOwner =
    currentUserId === comment.userId;

  return (
    <div className="rounded-lg border p-4">
      <CommentHeader
        userId={comment.userId}
        userFullName = {comment.userFullName}
        createdAt={comment.createdAt}
        isResolved={comment.isResolved}
      />

      {isEditing ? (
        <CommentInput
          initialValue={comment.content}
          submitText="Save"
          onCancel={() => setIsEditing(false)}
          onSubmit={(content) => {
            onUpdate(comment.id, content);

            setIsEditing(false);
          }}
        />
      ) : (
        <p className="whitespace-pre-wrap">
          {comment.content}
        </p>
      )}

      {!isEditing && (
        <CommentActions
          canReply={!comment.isResolved}
          canEdit={isOwner && !comment.isResolved}
          canDelete={isOwner}
          canResolve={!comment.isResolved && isOwner}
          isResolved={comment.isResolved}
          onReply={() => setIsReplying(true)}
          onEdit={() => setIsEditing(true)}
          onDelete={() => onDelete(comment.id)}
          onResolve={() => onResolve(comment.id)}
        />
      )}

      {isReplying && (
        <div className="mt-3">
          <CommentInput
            submitText="Reply"
            placeholder="Write a reply..."
            onCancel={() => setIsReplying(false)}
            onSubmit={(content) => {
              onReply(comment.id, content);

              setIsReplying(false);
            }}
          />
        </div>
      )}

      {comment.replies.length > 0 && (
        <CommentReplies
          comments={comment.replies}
          currentUserId={currentUserId}
          onReply={onReply}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onResolve={onResolve}
        />
      )}
    </div>
  );
}