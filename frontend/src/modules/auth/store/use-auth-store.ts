import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types/user.type';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  setAuth: (user: User, accessToken: string) => void;
  logout: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      hasHydrated: false,
      setAuth: (user, accessToken) =>
        set({ user, accessToken, isAuthenticated: !!accessToken }),
      logout: () =>
        set({ user: null, accessToken: null, isAuthenticated: false }),
      setHasHydrated: (state) => set({ hasHydrated: state }),
      }),
      {
        name: "auth-storage",
        
        partialize: (state) => ({
          user: state.user,
          accessToken: state.accessToken,
          }), 

        onRehydrateStorage: () => (state) => {
          if (state) {
            state.isAuthenticated = !!state.accessToken; 
            state.setHasHydrated(true);
          }
        },
      }
  )
);