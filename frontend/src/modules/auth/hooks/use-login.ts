import { useState } from 'react';
import { authApi } from '../api/auth.api';
import { useAuthStore } from '../store/use-auth-store';
import { useRouter } from 'next/navigation';
import { LoginRequest } from '../types/auth-request.type';
import { AxiosError } from 'axios';
import { useQueryClient } from '@tanstack/react-query';


export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();
  const queryClient = useQueryClient();

  const login = async (credentials: LoginRequest) => {
    setIsLoading(true);
    try {
      const response = await authApi.login(credentials);

      const { user, accessToken } = response.data.data;

      setAuth(user, accessToken);
      queryClient.clear();
      router.push("/");
      router.refresh(); 
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      alert(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};