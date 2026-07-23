export interface UserGamificationDto {
  userId: string;
  exp: number;
  level: number;
  title: string;
  expToNextLevel: number | null;
  isMaxLevel: boolean;
}
