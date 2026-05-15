export interface RefreshSessionResponse {
  success: boolean;

  data: {
    accessToken: string;
  };

  message?: string;
}