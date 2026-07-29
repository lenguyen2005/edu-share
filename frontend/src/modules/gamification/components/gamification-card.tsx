import { Trophy, Zap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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
      <Card className="border-indigo-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-colors duration-300">
        <CardContent className="p-6 space-y-6">
          <Skeleton className="h-8 w-1/3 dark:bg-slate-800" />
          <div className="flex gap-4">
            <Skeleton className="h-16 w-16 rounded-full dark:bg-slate-800" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-6 w-1/4 dark:bg-slate-800" />
              <Skeleton className="h-4 w-2/4 dark:bg-slate-800" />
            </div>
          </div>
          <Skeleton className="h-24 w-full rounded-xl dark:bg-slate-800" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !gamification) {
    return (
      <Card className="border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 shadow-sm transition-colors duration-300">
        <CardContent className="py-8 text-center text-red-500 font-medium">
          Không thể tải dữ liệu hạng. Vui lòng thử lại sau!
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-xl shadow-indigo-100/40 dark:shadow-indigo-900/20 ring-1 ring-slate-200/50 dark:ring-slate-800/50 transition-colors duration-300">
      {/* Hiệu ứng gradient trang trí góc */}
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-gradient-to-bl from-purple-200 via-indigo-100 to-transparent dark:from-purple-900/20 dark:via-indigo-900/20 opacity-60 blur-3xl mix-blend-multiply pointer-events-none transition-colors duration-300"></div>
      
      <CardHeader className="pb-2 relative z-10">
        <CardTitle className="flex items-center gap-2 text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-800 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          <div className="p-1.5 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg shadow-inner transition-colors duration-300">
            <Trophy className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
          </div>
          Bảng thành tích
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 relative z-10">
        {/* User Badge Section */}
        <div className="flex items-center gap-5">
          {/* Avatar / Level Badge */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 to-yellow-200 blur-sm rounded-full opacity-50 animate-pulse"></div>
            <Avatar className="h-16 w-16 border-4 border-white dark:border-slate-900 shadow-md relative z-10 transition-colors duration-300">
              <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white font-black text-xl">
                L{gamification.level}
              </AvatarFallback>
            </Avatar>
            {/* Rank Decorator */}
            <div className="absolute -bottom-1 -right-1 bg-yellow-400 border-2 border-white dark:border-slate-900 rounded-full p-1 shadow-sm z-20 transition-colors duration-300">
              <Trophy className="h-3 w-3 text-yellow-900" />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight transition-colors duration-300">
              Level {gamification.level}
            </h3>
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-md inline-block transition-colors duration-300">
              {gamification.title}
            </p>
          </div>
        </div>

        {/* Khung EXP nổi bật */}
        <div className="flex items-center justify-between rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 p-4 shadow-sm backdrop-blur-sm transition-colors duration-300">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-semibold">
            <Zap className="h-4 w-4 text-amber-500 fill-amber-500" />
            Tổng EXP
          </div>
          <span className="font-black text-lg text-slate-800 dark:text-slate-100 transition-colors duration-300">
            {gamification.exp.toLocaleString()} <span className="text-sm text-slate-400 dark:text-slate-500 font-bold">EXP</span>
          </span>
        </div>

        {/* Thanh tiến trình */}
        <div className="pt-2">
          <LevelProgress
            gamification={gamification}
            levelConfigs={levelConfigs ?? []}
          />
        </div>
      </CardContent>
    </Card>
  );
}