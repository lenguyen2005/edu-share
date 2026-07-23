export interface LeaderboardUser {
  rank: number;

  userId: string;

  fullName: string;

  level: number;

  exp: number;
}

export interface LeaderboardResponse {
  success: boolean;
  data: LeaderboardUser[];
}