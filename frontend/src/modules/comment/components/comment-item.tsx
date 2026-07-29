import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  MoreHorizontal,
  Pencil,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import type { CommentTree } from "../types/comment-tree";
import { CommentHeader } from "./comment-header";
import { CommentActions } from "./comment-actions";
import { CommentInput } from "./comment-input";
import { CommentReplies } from "./comment-replies";

interface CommentItemProps {
  comment: CommentTree;
  currentUserId?: string;
  onReply(commentId: string, content: string): void;
  onUpdate(commentId: string, content: string): void;
  onDelete(commentId: string): void;
  onResolve(commentId: string): void;
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

  const isOwner = currentUserId === comment.userId;

  return (
    <div className="group flex flex-col space-y-3">
      {/* Container chính của Comment - Nổi khối rõ ràng */}
      <div className="relative rounded-2xl bg-[#f8fafe] dark:bg-slate-800/60 border border-indigo-50 dark:border-slate-700/80 p-5 shadow-sm dark:shadow-md transition-all duration-300 hover:shadow-md hover:border-indigo-100 dark:hover:border-indigo-500/50 dark:hover:bg-slate-800/80">
        
        {isOwner && (
          <div className="absolute right-4 top-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="
                    rounded-lg
                    p-2
                    text-slate-400
                    dark:text-slate-400
                    transition-colors
                    duration-300
                    hover:bg-slate-200
                    dark:hover:bg-slate-700
                    hover:text-slate-700
                    dark:hover:text-slate-200
                  "
                >
                  <MoreHorizontal size={18} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                {isOwner && !comment.isResolved && (
                  <DropdownMenuItem onSelect={() => setIsEditing(true)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                )}

                {isOwner && (
                  <DropdownMenuItem
                    className="text-red-600 dark:text-red-400"
                    onSelect={() => onDelete(comment.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                )}

                {isOwner && !comment.isResolved && (
                  <DropdownMenuItem
                    onSelect={() => onResolve(comment.id)}
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Resolved
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        <div className="space-y-3">
          <CommentHeader
            userId={comment.userId}
            userFullName={comment.userFullName}
            createdAt={comment.createdAt}
            isResolved={comment.isResolved}
          />

          {isEditing ? (
            <div className="pt-2">
              <CommentInput
                initialValue={comment.content}
                submitText="Lưu"
                onCancel={() => setIsEditing(false)}
                onSubmit={(content) => {
                  onUpdate(comment.id, content);
                  setIsEditing(false);
                }}
              />
            </div>
          ) : (
            // Chữ màu trắng sáng để tăng Contrast
            <p className="whitespace-pre-wrap text-slate-700 dark:text-slate-100 leading-relaxed ml-14 transition-colors duration-300">
              {comment.content}
            </p>
          )}

          {!isEditing && (
            <div className="ml-14 mt-2">
              <CommentActions
                canReply={!comment.isResolved}
                onReply={() => setIsReplying(true)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Khu vực Nhập Reply */}
      {isReplying && (
        <div className="ml-14 mt-2 animate-in fade-in slide-in-from-top-2">
          <CommentInput
            submitText="Comment"
            placeholder="Write a comment..."
            autoFocus
            onCancel={() => setIsReplying(false)}
            onSubmit={(content) => {
              onReply(comment.id, content);
              setIsReplying(false);
            }}
          />
        </div>
      )}

      {/* Khu vực Danh sách Replies - Viền dẫn hướng nổi bật hơn */}
      {comment.replies.length > 0 && (
        <div className="ml-6 pl-8 border-l-2 border-indigo-100 dark:border-slate-700 mt-2 space-y-4 transition-colors duration-300">
          <CommentReplies
            comments={comment.replies}
            currentUserId={currentUserId}
            onReply={onReply}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onResolve={onResolve}
          />
        </div>
      )}
    </div>
  );
}