import { formatDistanceToNow } from "date-fns";

interface CommentHeaderProps {
  userId: string;

  userFullName: string;

  createdAt: string;

  isResolved: boolean;
}

export function CommentHeader({
  userId,
  userFullName,
  createdAt,
  isResolved,
}: CommentHeaderProps) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <div className="flex flex-col">
        <span className="font-medium">
          {userFullName}
        </span>

        <span className="text-xs text-gray-500">
          {formatDistanceToNow(new Date(createdAt), {
            addSuffix: true,
          })}
        </span>
      </div>

      {isResolved && (
        <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
          Resolved
        </span>
      )}
    </div>
  );
}