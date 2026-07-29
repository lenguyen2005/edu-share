import { UserAvatar } from "@/components/common/user-avatar";
import { formatDistanceToNow } from "date-fns";

interface CommentHeaderProps {
  userId: string;
  userFullName: string;
  createdAt: string;
  isResolved: boolean;
}

export function CommentHeader({
  userFullName,
  createdAt,
  isResolved,
}: CommentHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <UserAvatar fullName={userFullName} />

        <div className="flex flex-col">
          {/* Tên người dùng: Đổi sang trắng sáng ở Dark Mode */}
          <span className="font-semibold text-slate-800 dark:text-slate-100 transition-colors duration-300">
            {userFullName}
          </span>

          {/* Thời gian: Đổi sang xám nhạt ở Dark Mode */}
          <span className="text-xs text-slate-500 dark:text-slate-400 transition-colors duration-300">
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>

      {/* Nhãn Resolved: Nâng cấp UI thành dạng Badge hiện đại */}
      {isResolved && (
        <span className="
          rounded-full 
          bg-emerald-100 dark:bg-emerald-900/30 
          px-2.5 py-0.5 
          text-[10px] font-bold uppercase tracking-wider 
          text-emerald-700 dark:text-emerald-400 
          border border-emerald-200 dark:border-emerald-800/50 
          transition-colors duration-300
        ">
          Resolved
        </span>
      )}
    </div>
  );
}