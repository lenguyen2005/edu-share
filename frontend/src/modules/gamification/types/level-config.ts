export interface LevelConfig {
  level: number;

  minExp: number;

  title: string;
}

export interface LevelConfigResponse {
  success: boolean;
  data: LevelConfig[];
}
