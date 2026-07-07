import { UserDto } from '../types/user.type';
export interface AuthResponse {
  success: boolean;
  data: {
    user: UserDto;
    accessToken: string;
  };
  message?: string;
}