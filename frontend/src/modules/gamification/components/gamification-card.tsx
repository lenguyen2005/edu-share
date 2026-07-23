import { Trophy } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useUserGamification } from "../hooks/use-user-gamification";
import { useLevelConfigs } from "../hooks/use-level-configs";
import { LevelProgress } from "./level-progress";

export function GamificationCard() {
  const {
    data: gamification,
    isLoading,
    isError,
  } = useUserGamification();

  const {
    data: levelConfigs,
  } = useLevelConfigs();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          Loading gamification...
        </CardContent>
      </Card>
    );
  }

  if (isError || !gamification) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-destructive">
          Failed to load gamification data.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          My Gamification
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarFallback>
              LV
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <h3 className="text-lg font-semibold">
              Level {gamification.level}
            </h3>

            <p className="text-sm text-muted-foreground">
              {gamification.title}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <span className="text-muted-foreground">
            Current EXP
          </span>

          <span className="font-semibold">
            {gamification.exp} EXP
          </span>
        </div>

        <LevelProgress
            gamification={gamification}
            levelConfigs={levelConfigs ?? []}
          />
      </CardContent>
    </Card>
  );
}