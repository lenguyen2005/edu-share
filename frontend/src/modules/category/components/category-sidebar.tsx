"use client";

import { useCategoryTree } from "../hooks/use-category-tree";
import { CategoryItem } from "./category-item";
import { CreateCategoryDialog } from "./create-category-dialog";
import { useAuthStore } from "@/modules/auth/store/use-auth-store";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface CategorySidebarProps {
  onSelectCategory: (id: string) => void;
  selectedCategoryId?: string;
}

export function CategorySidebar({
  onSelectCategory,
  selectedCategoryId,
}: CategorySidebarProps) {
  const { data: tree, isLoading, error } = useCategoryTree();

  const { user } = useAuthStore();
  const isAdmin = user?.role === "ADMIN";

  if (isLoading) {
    return (
      <aside className="w-64 border-r h-screen bg-white p-4">
        <div className="flex items-center justify-between mb-4 px-2">
          <Skeleton className="h-5 w-[120px]" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>

        <div className="space-y-3">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[120px] ml-4" />
          <Skeleton className="h-4 w-[140px]" />
        </div>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="w-64 border-r h-screen bg-white p-4">
        <div className="text-red-500 text-sm">Lỗi tải danh mục</div>
      </aside>
    );
  }

  return (
    <aside className="w-64 border-r h-screen bg-white overflow-y-auto p-4">
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-lg font-semibold text-slate-800">Danh mục</h2>

        {isAdmin && <CreateCategoryDialog />}
      </div>

      <div className="space-y-1">
        <div
          className={cn(
            "px-4 py-2 text-sm rounded-md cursor-pointer hover:bg-slate-100 mb-2",
            !selectedCategoryId &&
              "bg-slate-900 text-white hover:bg-slate-800"
          )}
          onClick={() => onSelectCategory("")}
        >
          Tất cả tài liệu
        </div>

        {tree?.map((cat) => (
          <CategoryItem
            key={cat.id}
            category={cat}
            onSelect={onSelectCategory}
            selectedId={selectedCategoryId}
          />
        ))}
      </div>
    </aside>
  );
}