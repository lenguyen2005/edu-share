import type { MouseEventHandler } from "react";

interface CommentActionsProps {
  canReply?: boolean;

  canEdit?: boolean;

  canDelete?: boolean;

  canResolve?: boolean;

  isResolved?: boolean;

  loading?: boolean;

  onReply?: MouseEventHandler<HTMLButtonElement>;

  onEdit?: MouseEventHandler<HTMLButtonElement>;

  onDelete?: MouseEventHandler<HTMLButtonElement>;

  onResolve?: MouseEventHandler<HTMLButtonElement>;
}

export function CommentActions({
  canReply = true,
  canEdit = false,
  canDelete = false,
  canResolve = false,
  isResolved = false,
  loading = false,
  onReply,
  onEdit,
  onDelete,
  onResolve,
}: CommentActionsProps) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
      {canReply && (
        <button
          type="button"
          disabled={loading}
          className="text-blue-600 hover:underline disabled:opacity-50"
          onClick={onReply}
        >
          Reply
        </button>
      )}

      {canEdit && (
        <button
          type="button"
          disabled={loading}
          className="text-amber-600 hover:underline disabled:opacity-50"
          onClick={onEdit}
        >
          Edit
        </button>
      )}

      {canDelete && (
        <button
          type="button"
          disabled={loading}
          className="text-red-600 hover:underline disabled:opacity-50"
          onClick={onDelete}
        >
          Delete
        </button>
      )}

      {canResolve && !isResolved && (
        <button
          type="button"
          disabled={loading}
          className="text-green-600 hover:underline disabled:opacity-50"
          onClick={onResolve}
        >
          Resolve
        </button>
      )}
    </div>
  );
}