"use client";

import { useState } from "react";
import { useDocuments } from "../hooks/use-documents";
import { DocumentCard } from "./document-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { FileQuestion, ChevronLeft, ChevronRight } from "lucide-react";
import { DocumentDto } from "../types/document.dto";

type DocumentListProps = {
  categoryId?: string;
  search?: string;
};

export function DocumentList({ categoryId, search }: DocumentListProps) {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, isPlaceholderData } = useDocuments({
    page,
    limit: 12,
    categoryId,
    search,
  });

  const documents = data?.items ?? [];
  const meta = data?.meta;

  if (isLoading) {
    return <DocumentListSkeleton />;
  }

  if (!isLoading && documents.length === 0) {
    return <EmptyState search={search} />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Grid */}
      <div className="relative">
        {/* Lớp overlay loading mượt mà cho Dark Mode */}
        {isFetching && (
          <div className="absolute inset-0 z-10 rounded-2xl bg-slate-50/40 dark:bg-slate-950/40 backdrop-blur-[2px] transition-all duration-300" />
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc: DocumentDto) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      {meta && meta.lastPage > 1 && (
        <Pagination
          page={page}
          lastPage={meta.lastPage}
          isLoading={isFetching || isPlaceholderData}
          onPrev={() => setPage((p) => Math.max(p - 1, 1))}
          onNext={() => {
            if (!isPlaceholderData && page < meta.lastPage) {
              setPage((p) => p + 1);
            }
          }}
        />
      )}
    </div>
  );
}

//
// ===== Sub Components =====
//

function DocumentListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-start gap-4">
            <Skeleton className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4 bg-slate-100 dark:bg-slate-800" />
              <Skeleton className="h-3 w-1/2 bg-slate-50 dark:bg-slate-800/50" />
            </div>
          </div>
          <div className="space-y-2 pt-2">
            <Skeleton className="h-3 w-full bg-slate-50 dark:bg-slate-800/50" />
            <Skeleton className="h-3 w-4/5 bg-slate-50 dark:bg-slate-800/50" />
          </div>
          <Skeleton className="h-9 w-full mt-4 bg-slate-100 dark:bg-slate-800 rounded-md" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ search }: { search?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-2 border-dashed border-slate-200/80 dark:border-slate-800 rounded-3xl text-slate-400 dark:text-slate-500 transition-colors duration-300">
      <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-6 mb-4 shadow-inner">
        <FileQuestion size={48} className="text-slate-300 dark:text-slate-500" strokeWidth={1.5} />
      </div>
      <p className="text-base font-medium text-slate-600 dark:text-slate-300 text-center max-w-md">
        {search
          ? `Chưa tìm thấy tài liệu nào khớp với từ khóa "${search}"`
          : "Danh mục này hiện chưa có tài liệu nào."}
      </p>
      <p className="text-sm mt-2 text-slate-400 dark:text-slate-500">
        Hãy trở thành người đầu tiên đóng góp tài liệu nhé!
      </p>
    </div>
  );
}

type PaginationProps = {
  page: number;
  lastPage: number;
  isLoading: boolean;
  onPrev: () => void;
  onNext: () => void;
};

function Pagination({
  page,
  lastPage,
  isLoading,
  onPrev,
  onNext,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-4 pb-10">
      <Button
        variant="outline"
        size="sm"
        onClick={onPrev}
        disabled={page === 1 || isLoading}
        className="gap-1 rounded-full px-4 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 bg-transparent"
      >
        <ChevronLeft size={16} />
        Trước
      </Button>

      <div className="flex items-center justify-center px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-semibold shadow-inner transition-colors duration-300">
        Trang {page} <span className="text-indigo-300 dark:text-indigo-600/50 mx-1">/</span> {lastPage}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onNext}
        disabled={page === lastPage || isLoading}
        className="gap-1 rounded-full px-4 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 bg-transparent"
      >
        Sau
        <ChevronRight size={16} />
      </Button>
    </div>
  );
}