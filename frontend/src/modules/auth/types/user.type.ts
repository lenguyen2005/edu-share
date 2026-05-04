export interface User {
  id: string;
  email: string;
  fullName: string;
  role: "ADMIN" | "STUDENT" | "TEACHER";
}