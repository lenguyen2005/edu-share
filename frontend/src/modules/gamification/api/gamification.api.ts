import axiosClient from "@/shared/api/axios-client";

import {
  UserGamificationResponse,
} from "../types/user-gamification";

import {
  LeaderboardResponse,
} from "../types/leaderboard";

import {
  PointHistoryResponse,
} from "../types/point-history";

import {
  LevelConfigResponse,
} from "../types/level-config";

const GAMIFICATION_ENDPOINT = "/gamification";

export interface GetLeaderboardParams {
  limit?: number;
}

export interface GetPointHistoryParams {
  page?: number;
  limit?: number;
}

export interface AddExpPayload {
  userId: string;

  amount: number;

  reason: string;

  referenceId?: string;

  referenceType?: string;
}

export const gamificationApi = {
  /**
   * GET /gamification/me
   */
  getMyGamification: () =>
    axiosClient.get<UserGamificationResponse>(
      `${GAMIFICATION_ENDPOINT}/me`,
    ),

  /**
   * GET /gamification/leaderboard
   */
  getLeaderboard: (params?: GetLeaderboardParams) =>
    axiosClient.get<LeaderboardResponse>(
      `${GAMIFICATION_ENDPOINT}/leaderboard`,
      {
        params,
      },
    ),

  /**
   * GET /gamification/point-history
   */
  getPointHistory: (params?: GetPointHistoryParams) =>
    axiosClient.get<PointHistoryResponse>(
      `${GAMIFICATION_ENDPOINT}/point-history`,
      {
        params,
      },
    ),

  /**
   * GET /gamification/level-configs
   */
  getLevelConfigs: () =>
    axiosClient.get<LevelConfigResponse>(
      `${GAMIFICATION_ENDPOINT}/level-configs`,
    ),

  /**
   * POST /gamification/add-exp
   */
  addExp: (payload: AddExpPayload) =>
    axiosClient.post(
      `${GAMIFICATION_ENDPOINT}/add-exp`,
      payload,
    ),
};