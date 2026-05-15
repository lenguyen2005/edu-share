import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

import { authSessionService } from '@/modules/auth/services/auth-session.service';

interface CustomAxiosRequestConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  headers: {
    'Content-Type': 'application/json',
  },

  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const accessToken =
    authSessionService.getAccessToken();

  if (accessToken && config.headers) {
    config.headers.Authorization =
      `Bearer ${accessToken}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as CustomAxiosRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isUnauthorized =
      error.response?.status === 401;

    const isRetry = originalRequest._retry;

    // Prevent infinite refresh loop
    const isRefreshRequest =
      originalRequest.url?.includes(
        '/auth/refresh'
      );

    if (
      isUnauthorized &&
      !isRetry &&
      !isRefreshRequest
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken =
          await authSessionService.refreshSession();

        if (originalRequest.headers) {
          originalRequest.headers.Authorization =
            `Bearer ${newAccessToken}`;
        }

        return axiosClient(originalRequest);
      } catch (refreshError) {
        authSessionService.logout();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;