import { authApi } from '../api/auth.api';

import { useAuthStore } from '../store/use-auth-store';

class AuthSessionService {
  private refreshPromise: Promise<string> | null =
    null;

  getAccessToken() {
    return useAuthStore.getState().accessToken;
  }

  async refreshSession() {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      try {
        const response =
          await authApi.refreshSession();

        const accessToken =
          response.data.accessToken;

        const currentUser =
          useAuthStore.getState().user;

        if (!currentUser) {
          throw new Error('User not found');
        }

        useAuthStore
          .getState()
          .setAuth(currentUser, accessToken);

        return accessToken;
      } catch (error) {
        useAuthStore.getState().logout();

        throw error;
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  logout() {
    useAuthStore.getState().logout();
  }
}

export const authSessionService =
  new AuthSessionService();