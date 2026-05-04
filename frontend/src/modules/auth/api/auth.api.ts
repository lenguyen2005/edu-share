import axiosClient from '@/shared/api/axios-client';
import { LoginRequest, RegisterRequest } from '../types/auth-request.type';
import { AuthResponse } from '../types/auth-response.type';

export const authApi = {
  login: (data: LoginRequest) =>
    axiosClient.post<AuthResponse>('/auth/login', data),

  register: (data: RegisterRequest) =>
    axiosClient.post<AuthResponse>('/auth/register', data),

  logout: () => axiosClient.post<void>('/auth/logout'),
};