"use client";

import { useCategoryTree } from "../hooks/use-category-tree";
import { CategoryItem } from "./category-item";
import { CreateCategoryDialog } from "./create-category-dialog";
import { useAuthStore } from "@/modules/auth/store/use-auth-store";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Library, BookOpen } from "lucide-react";

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
      <aside className="w-72 border-r border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl min-h-screen p-5 flex flex-col gap-6 transition-colors duration-300">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-24 rounded-md bg-indigo-50 dark:bg-indigo-900/20" />
          <Skeleton className="h-8 w-8 rounded-full bg-indigo-50 dark:bg-indigo-900/20" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-10 w-full rounded-xl bg-slate-100 dark:bg-slate-800/50" />
          <div className="space-y-3 pt-4">
            <Skeleton className="h-5 w-3/4 rounded-md bg-slate-100 dark:bg-slate-800/50" />
            <Skeleton className="h-5 w-1/2 rounded-md bg-slate-100 dark:bg-slate-800/50 ml-6" />
            <Skeleton className="h-5 w-2/3 rounded-md bg-slate-100 dark:bg-slate-800/50" />
          </div>
        </div>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="w-72 border-r border-slate-200/60 dark:border-slate-800/60 bg-red-50/30 dark:bg-red-900/10 min-h-screen p-5 transition-colors duration-300">
        <div className="rounded-xl bg-red-50 dark:bg-red-900/20 p-4 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium shadow-sm">
          Oops! Không thể tải danh mục. Vui lòng thử lại sau.
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-72 border-r border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl min-h-screen overflow-y-auto p-4 flex flex-col gap-4 shadow-[1px_0_15px_-5px_rgba(0,0,0,0.03)] dark:shadow-none transition-colors duration-300">
      
      {/* Header Sidebar */}
      <div className="flex items-center px-2 pt-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 via-indigo-100 to-pink-100 dark:from-purple-900/30 dark:via-indigo-900/30 dark:to-pink-900/30 p-2 shadow-sm">
            <BookOpen className="h-4 w-4 stroke-[2.5] text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="font-heading text-base font-extrabold uppercase tracking-tight text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
            Danh mục tài liệu
          </h2>
        </div>
        {isAdmin && <CreateCategoryDialog />}
      </div>

      <div className="space-y-1.5 mt-2">
        {/* Nút "Tất cả tài liệu" */}
        <div
          className={cn(
            "flex items-center gap-3 px-4 py-3 text-lg font-bold rounded-xl cursor-pointer transition-all duration-300",
            !selectedCategoryId
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-200 dark:shadow-none translate-x-1"
              : "bg-transparent text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-900 hover:shadow-sm dark:hover:shadow-none hover:text-indigo-600 dark:hover:text-indigo-400 border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
          )}
          onClick={() => onSelectCategory("")}
        >
          <Library size={22} className={cn(!selectedCategoryId ? "text-indigo-100" : "text-slate-400 dark:text-slate-500")} />
          Tất cả tài liệu
        </div>

        {/* Cây danh mục */}
        <div className="pt-2 space-y-1">
          {tree?.map((cat) => (
            <CategoryItem
              key={cat.id}
              category={cat}
              onSelect={onSelectCategory}
              selectedId={selectedCategoryId}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}