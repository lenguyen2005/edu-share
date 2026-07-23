export interface UserGamification {
  userId: string;

  exp: number;

  level: number;

  title: string;

  expToNextLevel: number;

  isMaxLevel: boolean;
}

export interface UserGamificationResponse {
  success: boolean;
  data: UserGamification;
}
