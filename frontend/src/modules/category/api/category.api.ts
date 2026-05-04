import { CategoryTreeDto } from "../types/category.type";
import axiosClient from "@/shared/api/axios-client";
import { ApiResponse } from "@/shared/types/api-response.type";
import { CategoryDto } from "../types/category.type";

export const categoryApi = {
  getCategoryTree: async (): Promise<CategoryTreeDto[]> => {
    const res = await axiosClient.get<ApiResponse<CategoryTreeDto[]>>(
      "/categories/tree"
    );

    if (!res.data.success) {
      throw new Error(res.data.message || "Lấy danh mục thất bại");
    }

    return res.data.data ?? [];
  },

  create: (data: { name: string; parentId?: string }) => {
    return axiosClient.post<ApiResponse<CategoryDto>>("/categories", data);
  },
};