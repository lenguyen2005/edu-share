import { useQuery } from "@tanstack/react-query";

import { gamificationApi } from "../api/gamification.api";

export function useLevelConfigs() {
  return useQuery({
    queryKey: ["gamification", "level-configs"],

    queryFn: async () => {
      const { data } =
        await gamificationApi.getLevelConfigs();

      return data.data;
    },
  });
}
