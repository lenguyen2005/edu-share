import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/use-auth-store";
import { authApi } from "../api/auth.api";
import { useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const clearAuth = useAuthStore((s) => s.logout);
  const router = useRouter();
  const queryClient = useQueryClient();

  return async () => {
    try {
      await authApi.logout();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // có thể ignore nếu fail
    } finally {
      clearAuth();
      queryClient.clear();
      router.replace("/");
      router.refresh();
    }
  };
};
