import { cn } from "@/lib/utils";

interface UserAvatarProps {
  fullName?: string;
  className?: string;
}

export function UserAvatar({
  fullName,
  className,
}: UserAvatarProps) {
  const initials =
    fullName
      ?.trim()
      .split(/\s+/)
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "U";

  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full",
        "bg-gradient-to-br from-indigo-500 to-violet-600",
        "text-sm font-bold text-white shadow-sm",
        className,
      )}
    >
      {initials}
    </div>
  );
}