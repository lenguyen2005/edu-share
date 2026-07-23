import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      <Card>
        <CardContent className="py-8 text-center">
          Loading leaderboard...
        </CardContent>
      </Card>
    );
  }

  if (isError || !leaderboard) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-destructive">
          Failed to load leaderboard.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
      </CardHeader>

      <CardContent>
        {leaderboard.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            No leaderboard available.
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