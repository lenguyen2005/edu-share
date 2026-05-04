"use client";
import { useState, useEffect } from "react";
import { DocumentList } from "@/modules/document/components/document-list";

export default function HomePage() {
  const [selectedCatId, setSelectedCatId] = useState<string>("");

  // Lắng nghe sự kiện chọn category từ Sidebar
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFilter = (e: any) => setSelectedCatId(e.detail);
    window.addEventListener("filter-category", handleFilter);
    return () => window.removeEventListener("filter-category", handleFilter);
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Thư viện tài liệu trực tuyến</h1>
        <p className="text-slate-500">Khám phá và tải về hàng ngàn tài liệu miễn phí.</p>
      </div>

      {/* Danh sách tài liệu - Tự động fetch lại khi selectedCatId thay đổi */}
      <DocumentList categoryId={selectedCatId} />
    </div>
  );
}