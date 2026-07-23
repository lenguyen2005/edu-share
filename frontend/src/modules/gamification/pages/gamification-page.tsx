import { Award } from "lucide-react";

import { GamificationCard } from "../components/gamification-card";
import { LeaderboardCard } from "../components/leaderboard-card";

export default function GamificationPage() {
  return (
    <div className="container mx-auto space-y-6 py-6">
      <div className="flex items-center gap-3">
        <Award className="h-8 w-8 text-primary" />

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Gamification
          </h1>

          <p className="text-muted-foreground">
            Track your learning progress, level, and leaderboard ranking.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <GamificationCard />
        </div>

        <div className="lg:col-span-2">
          <LeaderboardCard />
        </div>
      </div>
    </div>
  );
}