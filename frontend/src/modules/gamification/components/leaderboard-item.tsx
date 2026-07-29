import { Crown, Medal, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { LeaderboardUser } from "../types/leaderboard";

interface LeaderboardItemProps {
  user: LeaderboardUser;
}

export function LeaderboardItem({
  user,
}: LeaderboardItemProps) {
  
  // Trích xuất logic Config theo từng Rank để code Clean hơn và hỗ trợ Dark mode tốt hơn
  const getRankConfig = () => {
    switch (user.rank) {
      case 1:
        return {
          wrapper: "bg-gradient-to-r from-yellow-50 via-amber-50/50 to-white dark:from-yellow-900/20 dark:via-amber-900/10 dark:to-transparent border-yellow-200 dark:border-yellow-900/50 shadow-md shadow-yellow-100/50 dark:shadow-none hover:-translate-y-1 z-10 relative scale-[1.02]",
          icon: <Crown className="h-7 w-7 text-yellow-500 fill-yellow-500 drop-shadow-sm dark:drop-shadow-none" />,
          avatarBorder: "border-2 border-yellow-400 dark:border-yellow-500 ring-4 ring-yellow-100 dark:ring-yellow-900/30",
          avatarBg: "bg-gradient-to-br from-yellow-400 to-amber-600 text-white",
          expText: "text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500 font-black text-xl drop-shadow-sm dark:drop-shadow-none",
        };
      case 2:
        return {
          wrapper: "bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/50 dark:to-transparent border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none hover:-translate-y-0.5",
          icon: <Trophy className="h-6 w-6 text-slate-400 dark:text-slate-500 fill-slate-300 dark:fill-slate-600" />,
          avatarBorder: "border-2 border-slate-300 dark:border-slate-600 ring-2 ring-slate-100 dark:ring-slate-800",
          avatarBg: "bg-gradient-to-br from-slate-300 to-slate-500 dark:from-slate-600 dark:to-slate-700 text-white",
          expText: "text-slate-700 dark:text-slate-300 font-bold text-lg",
        };
      case 3:
        return {
          wrapper: "bg-gradient-to-r from-orange-50/50 to-white dark:from-orange-900/20 dark:to-transparent border-orange-200/60 dark:border-orange-900/50 shadow-sm dark:shadow-none hover:-translate-y-0.5",
          icon: <Medal className="h-6 w-6 text-orange-400 dark:text-orange-500 fill-orange-300 dark:fill-orange-800/50" />,
          avatarBorder: "border-2 border-orange-300 dark:border-orange-700/50 ring-2 ring-orange-50 dark:ring-orange-900/30",
          avatarBg: "bg-gradient-to-br from-orange-300 to-amber-600 text-white",
          expText: "text-orange-700 dark:text-orange-400 font-bold text-lg",
        };
      default:
        return {
          wrapper: "bg-white dark:bg-slate-900/40 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:border-indigo-100 dark:hover:border-indigo-900/50 hover:shadow-sm dark:hover:shadow-none transition-all",
          icon: <span className="w-6 text-center font-bold text-slate-400 dark:text-slate-500 text-lg">#{user.rank}</span>,
          avatarBorder: "border border-slate-200 dark:border-slate-700",
          avatarBg: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold",
          expText: "text-slate-700 dark:text-slate-300 font-bold",
        };
    }
  };

  const config = getRankConfig();

  return (
    <div className={cn(
      "flex items-center justify-between rounded-2xl border p-4 transition-all duration-300",
      config.wrapper
    )}>
      
      <div className="flex items-center gap-4 md:gap-6">
        {/* Vùng chứa Icon Rank */}
        <div className="flex w-10 justify-center">
          {config.icon}
        </div>

        {/* Avatar với border tùy biến */}
        <Avatar className={cn("h-12 w-12 shadow-sm dark:shadow-none transition-colors duration-300", config.avatarBorder)}>
          <AvatarFallback className={cn("text-base tracking-wider transition-colors duration-300", config.avatarBg)}>
            {user.fullName
              .split(" ")
              .map((name) => name[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* Info Text */}
        <div>
          <p className="font-bold text-slate-800 dark:text-slate-100 text-base md:text-lg transition-colors duration-300">
            {user.fullName}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="inline-block rounded-md bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 transition-colors duration-300">
              Lv. {user.level}
            </span>
          </div>
        </div>
      </div>

      {/* EXP Display */}
      <div className="text-right">
        <p className={cn("transition-colors duration-300", config.expText)}>
          {user.exp.toLocaleString()} <span className="text-xs font-bold opacity-70">EXP</span>
        </p>
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wider transition-colors duration-300">
          Hạng {user.rank}
        </p>
      </div>
      
    </div>
  );
}