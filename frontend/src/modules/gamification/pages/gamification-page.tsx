import { Award, Sparkles } from "lucide-react";

import { GamificationCard } from "../components/gamification-card";
import { LeaderboardCard } from "../components/leaderboard-card";

export default function GamificationPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 py-8 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 transition-all duration-300">
          <Award className="h-7 w-7 text-white" />
        </div>

        <div>
          <h1 className="flex items-center gap-2 text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100 transition-colors duration-300">
            Gamification 
            <Sparkles className="h-5 w-5 text-amber-500 animate-pulse" />
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 transition-colors duration-300">
            Theo dõi tiến trình học tập, thăng cấp và đua top bảng xếp hạng.
          </p>
        </div>
      </div>

      {/* Grid Layout - Tối ưu lại tỷ lệ 1:2.5 cho màn hình lớn */}
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5 xl:col-span-4">
          <GamificationCard />
        </div>

        <div className="lg:col-span-7 xl:col-span-8">
          <LeaderboardCard />
        </div>
      </div>
    </div>
  );
}