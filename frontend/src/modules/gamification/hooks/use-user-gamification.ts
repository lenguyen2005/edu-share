import { useQuery } from "@tanstack/react-query";

import { gamificationApi } from "../api/gamification.api";

export function useUserGamification() {
  return useQuery({
    queryKey: ["gamification", "me"],

    queryFn: async () => {
      const { data } = await gamificationApi.getMyGamification();
      return data.data;
    },
  });
}
