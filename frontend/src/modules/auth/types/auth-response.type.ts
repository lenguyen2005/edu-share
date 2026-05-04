import { User } from '../types/user.type';
export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    accessToken: string;
  };
  message?: string;
}