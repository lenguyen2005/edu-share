import { create } from "zustand";
import { UserDto } from "../types/user.type";

interface AuthState {
  user: UserDto | null;
  accessToken: string | null;

  isInitializing: boolean;

  setAuth: (user: UserDto, accessToken: string) => void;
  logout: () => void;
  finishInitializing: () => void;
  startInitializing: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,

  isInitializing: true,

  setAuth: (user, accessToken) =>
    set({
      user,
      accessToken,
      isInitializing: false,
    }),

  logout: () =>
    set({
      user: null,
      accessToken: null,
      isInitializing: false,
    }),

  finishInitializing: () =>
    set({
      isInitializing: false,
    }),

  startInitializing: () =>
    set({
      isInitializing: true,
    }),
}));