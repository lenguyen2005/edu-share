import { Progress } from "@/components/ui/progress";
import { Sparkles } from "lucide-react";

import { LevelConfig } from "../types/level-config";
import { UserGamification } from "../types/user-gamification";

interface LevelProgressProps {
  gamification: UserGamification;
  levelConfigs: LevelConfig[];
}

export function LevelProgress({
  gamification,
  levelConfigs,
}: LevelProgressProps) {
  // Trạng thái MAX LEVEL
  if (gamification.isMaxLevel) {
    return (
      <div className="space-y-3 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 p-5 border border-yellow-200 dark:border-yellow-900/50 shadow-sm relative overflow-hidden transition-colors duration-300">
        <Sparkles className="absolute top-2 right-2 h-12 w-12 text-yellow-300 dark:text-yellow-600/30 opacity-20" />
        <div className="flex items-center justify-between">
          <span className="font-bold text-yellow-900 dark:text-yellow-500 transition-colors duration-300">
            Level Progress
          </span>
          <span className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600 dark:from-amber-400 dark:to-yellow-500 animate-pulse transition-colors duration-300">
            MAX LEVEL
          </span>
        </div>

        <Progress 
          value={100} 
          indicatorClassName="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-500 shadow-[0_0_10px_rgba(251,191,36,0.5)] dark:shadow-none" 
        />

        <p className="text-sm font-medium text-yellow-700/80 dark:text-yellow-500/80 transition-colors duration-300">
          Chúc mừng! Bạn đã đạt cảnh giới cao nhất của học thuật.
        </p>
      </div>
    );
  }

  const currentLevel = levelConfigs.find(
    (config) => config.level === gamification.level,
  );

  const nextLevel = levelConfigs.find(
    (config) => config.level === gamification.level + 1,
  );

  if (!currentLevel || !nextLevel) {
    return (
      <div className="space-y-2">
        <Progress value={0} indicatorClassName="bg-slate-300 dark:bg-slate-700" />
        <p className="text-sm text-slate-400 dark:text-slate-500 transition-colors duration-300">
          Không thể tính toán tiến trình level.
        </p>
      </div>
    );
  }

  const currentLevelMinExp = currentLevel.minExp;
  const nextLevelMinExp = nextLevel.minExp;
  const expInCurrentLevel = gamification.exp - currentLevelMinExp;
  const totalExpNeeded = nextLevelMinExp - currentLevelMinExp;

  const progress = (expInCurrentLevel / totalExpNeeded) * 100;
  const progressPercentage = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-slate-700 dark:text-slate-200 transition-colors duration-300">
          Tiến trình Level
        </span>
        <span className="text-sm font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-md transition-colors duration-300">
          {Math.round(progressPercentage)}%
        </span>
      </div>

      <Progress 
        value={progressPercentage} 
        indicatorClassName="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md dark:shadow-none"
      />

      <div className="flex justify-between text-xs font-semibold">
        <span className="text-slate-500 dark:text-slate-400 transition-colors duration-300">
          <span className="text-slate-800 dark:text-slate-100">{gamification.exp}</span> EXP hiện tại
        </span>
        <span className="text-slate-500 dark:text-slate-400 transition-colors duration-300">
          Cần thêm <span className="text-indigo-600 dark:text-indigo-400">{gamification.expToNextLevel} EXP</span>
        </span>
      </div>
    </div>
  );
}