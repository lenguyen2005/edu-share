import { Crown, Medal, Trophy } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { LeaderboardUser } from "../types/leaderboard";

interface LeaderboardItemProps {
  user: LeaderboardUser;
}

export function LeaderboardItem({
  user,
}: LeaderboardItemProps) {
  const getRankIcon = () => {
    switch (user.rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;

      case 2:
        return <Trophy className="h-5 w-5 text-slate-400" />;

      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />;

      default:
        return (
          <span className="w-5 text-center font-semibold">
            {user.rank}
          </span>
        );
    }
  };

  return (
    <div className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50">
      <div className="flex items-center gap-4">
        {getRankIcon()}

        <Avatar>
          <AvatarFallback>
            {user.fullName
              .split(" ")
              .map((name) => name[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div>
          <p className="font-medium">
            {user.fullName}
          </p>

          <p className="text-sm text-muted-foreground">
            Level {user.level}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="font-semibold">
          {user.exp} EXP
        </p>

        <p className="text-xs text-muted-foreground">
          Rank #{user.rank}
        </p>
      </div>
    </div>
  );
}