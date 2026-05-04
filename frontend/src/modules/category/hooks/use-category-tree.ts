import { CategoryTreeDto } from "../types/category.type";
import { useQuery } from "@tanstack/react-query";
import { categoryApi } from "../api/category.api";

export const useCategoryTree = () => {
  return useQuery<CategoryTreeDto[]>({
    queryKey: ["category-tree"],
    queryFn: categoryApi.getCategoryTree,
    staleTime: 1000 * 60 * 5, // 5 phút
    gcTime: 1000 * 60 * 10,   // 10 phút
  });
};