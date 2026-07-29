import Link from "next/link";
import { useAuthStore } from "@/modules/auth/store/use-auth-store";
import { useEffect, useState } from "react";
import { SendHorizontal as Send } from "lucide-react"; 
import { UserAvatar } from "@/components/common/user-avatar";

interface CommentInputProps {
  initialValue?: string;
  placeholder?: string;
  submitText?: string;
  loading?: boolean;
  autoFocus?: boolean;
  onSubmit(content: string): void;
  onCancel?(): void;
}

export function CommentInput({
  initialValue = "",
  placeholder = "Viết bình luận của bạn...",
  submitText = "Gửi bình luận",
  loading = false,
  autoFocus = false,
  onSubmit,
  onCancel,
}: CommentInputProps) {
  const [content, setContent] = useState(initialValue);
  const user = useAuthStore((state) => state.user);
  const { accessToken } = useAuthStore();

  const isAuthenticated = !!accessToken;

  useEffect(() => {
    setContent(initialValue);
  }, [initialValue]);

  const handleSubmit = () => {
    const value = content.trim();
    if (!value) return;

    onSubmit(value);

    if (initialValue === "") {
      setContent("");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6 text-center transition-colors duration-300 shadow-inner dark:shadow-none">
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 transition-colors duration-300">
          Vui lòng đăng nhập để đăng bình luận
        </h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">
          Đăng nhập để tham gia thảo luận và chia sẻ ý kiến của bạn.
        </p>
        <Link href="/login">
          <button className="mt-5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2 font-semibold text-white transition hover:from-indigo-700 hover:to-purple-700 shadow-md">
            Đăng nhập
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex w-full gap-4">
      <UserAvatar fullName={user?.fullName} />
        
      {/* Vùng Input - Đẩy sáng nền lên slate-800 thay vì slate-900 */}
      <div className="flex-1 flex flex-col rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden shadow-sm dark:shadow-md transition-all duration-300 focus-within:border-indigo-400 dark:focus-within:border-indigo-500 focus-within:shadow-md focus-within:ring-4 focus-within:ring-indigo-50 dark:focus-within:ring-indigo-900/30">
        
        {/* Text Area */}
        <textarea
          value={content}
          placeholder={placeholder}
          autoFocus={autoFocus}
          disabled={loading}
          rows={3}
          className="w-full resize-none bg-transparent p-4 outline-none text-slate-700 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors duration-300"
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Toolbar - Dùng màu nền tối hơn Text Area một chút để phân tách */}
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-900/50 bg-slate-50/50 dark:bg-slate-900/40 px-4 py-3 transition-colors duration-300">
          <div className="flex gap-2 ml-auto">
            {onCancel && (
              <button
                type="button"
                disabled={loading}
                className="rounded-full px-5 py-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300"
                onClick={onCancel}
              >
                Cancel
              </button>
            )}

            <button
              type="button"
              disabled={loading || content.trim().length === 0}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2 text-sm font-bold text-white shadow-md transition-all duration-300 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 disabled:shadow-none dark:shadow-indigo-900/30"
              onClick={handleSubmit}
            >
              <Send size={16} className={loading ? "animate-pulse" : ""} />
              {loading ? "Đang gửi..." : submitText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}