import { UserRole } from "./user-role";

export interface UserDto {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
}