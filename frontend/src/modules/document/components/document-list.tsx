"use client";

import { useState } from "react";
import { useDocuments } from "../hooks/use-documents";
import { DocumentCard } from "./document-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
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

  // ===== Loading (lần đầu) =====
  if (isLoading) {
    return <DocumentListSkeleton />;
  }

  // ===== Empty state =====
  if (!isLoading && documents.length === 0) {
    return <EmptyState search={search} />;
  }

  return (
    <div className="space-y-8">
      {/* Grid */}
      <div className="relative">
        {/* overlay loading khi đổi page/search */}
        {isFetching && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 rounded-xl" />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-[180px] w-full rounded-xl" />
      ))}
    </div>
  );
}

function EmptyState({ search }: { search?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
      <FileQuestion size={48} strokeWidth={1} />
      <p className="mt-4 text-sm text-center">
        {search
          ? `Không tìm thấy tài liệu với từ khóa "${search}"`
          : "Không tìm thấy tài liệu trong danh mục này."}
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
    <div className="flex items-center justify-center gap-3 pb-10">
      <Button
        variant="outline"
        size="sm"
        onClick={onPrev}
        disabled={page === 1 || isLoading}
      >
        Trước
      </Button>

      <span className="text-sm font-medium">
        Trang {page} / {lastPage}
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={onNext}
        disabled={page === lastPage || isLoading}
      >
        Sau
      </Button>
    </div>
  );
}