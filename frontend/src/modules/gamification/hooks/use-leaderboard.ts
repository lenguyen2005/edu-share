import { useQuery } from "@tanstack/react-query";

import { gamificationApi } from "../api/gamification.api";

interface UseLeaderboardOptions {
  limit?: number;
}

export function useLeaderboard(
  options: UseLeaderboardOptions = {},
) {
  const { limit = 10 } = options;

  return useQuery({
    queryKey: ["gamification", "leaderboard", limit],

    queryFn: async () => {
      const { data } = await gamificationApi.getLeaderboard({
        limit,
      });

      return data.data;
    },
  });
}