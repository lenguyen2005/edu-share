import axiosClient from "@/shared/api/axios-client";

import type { ApiResponse } from '@/shared/types/api-response.type';

import type { Comment } from "../types/comment";

import type { CreateCommentDto } from "../dto/create-comment.dto";
import type { UpdateCommentDto } from "../dto/update-comment.dto";
import type { ReplyCommentDto } from "../dto/reply-comment.dto";
import { CommentTree } from "../types/comment-tree";

export const commentApi = {
  /**
   * Get all comments of a document
   */
  async getDocumentComments(
    documentId: string,
  ): Promise<ApiResponse<CommentTree[]>> {
    const { data } = await axiosClient.get<ApiResponse<CommentTree[]>>(
      `/documents/${documentId}/comments`,
    );

    return data;
  },

  /**
   * Create root comment
   */
  async create(
    dto: CreateCommentDto,
  ): Promise<ApiResponse<Comment>> {
    const { data } = await axiosClient.post<ApiResponse<Comment>>(
      "/comments",
      dto,
    );

    return data;
  },

  /**
   * Reply comment
   */
  async reply(
    commentId: string,
    dto: ReplyCommentDto,
  ): Promise<ApiResponse<Comment>> {
    const { data } = await axiosClient.post<ApiResponse<Comment>>(
      `/comments/${commentId}/replies`,
      dto,
    );

    return data;
  },

  /**
   * Update comment
   */
  async update(
    commentId: string,
    dto: UpdateCommentDto,
  ): Promise<ApiResponse<Comment>> {
    const { data } = await axiosClient.put<ApiResponse<Comment>>(
      `/comments/${commentId}`,
      dto,
    );

    return data;
  },

  /**
   * Resolve comment
   */
  async resolve(
    commentId: string,
  ): Promise<ApiResponse<Comment>> {
    const { data } = await axiosClient.patch<ApiResponse<Comment>>(
      `/comments/${commentId}/resolve`,
    );

    return data;
  },

  /**
   * Delete comment
   */
  async delete(
    commentId: string,
  ): Promise<ApiResponse<void>> {
    const { data } = await axiosClient.delete<ApiResponse<void>>(
      `/comments/${commentId}`,
    );

    return data;
  },
};