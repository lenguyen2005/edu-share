import { useQuery } from "@tanstack/react-query";

import { gamificationApi } from "../api/gamification.api";

interface UsePointHistoryOptions {
  page?: number;

  limit?: number;
}

export function usePointHistory(
  options: UsePointHistoryOptions = {},
) {
  const {
    page = 1,
    limit = 10,
  } = options;

  return useQuery({
    queryKey: [
      "gamification",
      "point-history",
      page,
      limit,
    ],

    queryFn: async () => {
      const { data } =
        await gamificationApi.getPointHistory({
          page,
          limit,
        });

      return data.data;
    },
  });
}
