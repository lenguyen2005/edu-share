import type { MouseEventHandler } from "react";
import { MessageCircle } from "lucide-react";

interface CommentActionsProps {
  canReply?: boolean;

  loading?: boolean;

  onReply?: MouseEventHandler<HTMLButtonElement>;
}

export function CommentActions({
  canReply = true,
  loading = false,
  onReply,
}: CommentActionsProps) {
  if (!canReply) {
    return null;
  }

  return (
    <div className="mt-3 flex items-center">
      <button
        type="button"
        disabled={loading}
        onClick={onReply}
        className="
          inline-flex
          items-center
          gap-2
          rounded-lg
          px-3
          py-1.5

          text-sm
          font-medium
          text-slate-500

          transition-all
          duration-200

          hover:bg-indigo-50
          hover:text-indigo-600

          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <MessageCircle size={15} />

        <span>Reply</span>
      </button>
    </div>
  );
}