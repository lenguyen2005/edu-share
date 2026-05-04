import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryApi } from "../api/category.api";
import { toast } from "sonner";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryApi.create,
    onSuccess: () => {
      toast.success("Thêm danh mục mới thành công!");
      // Làm mới cây danh mục ở Sidebar và các nơi khác
      queryClient.invalidateQueries({ queryKey: ["category-tree"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Không thể thêm danh mục");
    }
  });
};