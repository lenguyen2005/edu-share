import { Progress } from "@/components/ui/progress";

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
  if (gamification.isMaxLevel) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-medium">
            Level Progress
          </span>

          <span className="text-sm font-medium text-green-600">
            MAX LEVEL
          </span>
        </div>

        <Progress value={100} />

        <p className="text-sm text-muted-foreground">
          Congratulations! You have reached the highest level.
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
        <Progress value={0} />

        <p className="text-sm text-muted-foreground">
          Unable to calculate level progress.
        </p>
      </div>
    );
  }

  const currentLevelMinExp = currentLevel.minExp;

  const nextLevelMinExp = nextLevel.minExp;

  const expInCurrentLevel =
    gamification.exp - currentLevelMinExp;

  const totalExpNeeded =
    nextLevelMinExp - currentLevelMinExp;

  const progress =
    (expInCurrentLevel / totalExpNeeded) * 100;

  const progressPercentage = Math.min(
    Math.max(progress, 0),
    100,
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-medium">
          Level Progress
        </span>

        <span className="text-sm text-muted-foreground">
          {Math.round(progressPercentage)}%
        </span>
      </div>

      <Progress value={progressPercentage} />

      <div className="flex justify-between text-sm text-muted-foreground">
        <span>
          {gamification.exp} EXP
        </span>

        <span>
          {gamification.expToNextLevel} EXP to next level
        </span>
      </div>
    </div>
  );
}