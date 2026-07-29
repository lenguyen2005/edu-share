import { Flame } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useLeaderboard } from "../hooks/use-leaderboard";
import { LeaderboardItem } from "./leaderboard-item";

export function LeaderboardCard() {
  const {
    data: leaderboard,
    isLoading,
    isError,
  } = useLeaderboard({
    limit: 10,
  });

  if (isLoading) {
    return (
      <Card className="border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-xl shadow-slate-200/40 dark:shadow-slate-900/20 rounded-3xl overflow-hidden transition-colors duration-300">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/50 pb-5 transition-colors duration-300">
          <Skeleton className="h-8 w-48 rounded-lg dark:bg-slate-800" />
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-2xl dark:bg-slate-800" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (isError || !leaderboard) {
    return (
      <Card className="border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 rounded-3xl shadow-sm transition-colors duration-300">
        <CardContent className="py-12 text-center text-red-500 font-medium">
          Không thể tải bảng xếp hạng lúc này. Vui lòng thử lại sau!
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-xl shadow-slate-200/40 dark:shadow-none rounded-3xl overflow-hidden ring-1 ring-slate-100 dark:ring-slate-800/60 transition-colors duration-300">
      <CardHeader className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/50 pb-4 pt-5 px-6 transition-colors duration-300">
        <CardTitle className="flex items-center gap-2 text-xl font-black text-slate-800 dark:text-slate-100 transition-colors duration-300">
          <Flame className="h-6 w-6 text-orange-500 fill-orange-500 animate-pulse" />
          Bảng xếp hạng (Leaderboard)
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        {leaderboard.length === 0 ? (
          <div className="py-12 text-center text-slate-400 dark:text-slate-500 font-medium flex flex-col items-center gap-2 transition-colors duration-300">
            <span className="text-4xl">📭</span>
            Chưa có dữ liệu bảng xếp hạng.
          </div>
        ) : (
          <div className="space-y-3">
            {leaderboard.map((user) => (
              <LeaderboardItem
                key={user.userId}
                user={user}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}