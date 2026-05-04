"use client";
import { useState } from "react";
import { FileText, Download, Lock, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { documentApi } from "../api/document.api";
import { DocumentDto } from "../types/document.dto";
import axiosClient from "@/shared/api/axios-client";
import { useQueryClient } from "@tanstack/react-query";

interface DocumentCardProps {
  document: DocumentDto;
}

export function DocumentCard({ document }: DocumentCardProps) {
  const [isPublishing, setIsPublishing] = useState(false);
  const queryClient = useQueryClient();

  const isDraft = document.status === "DRAFT";

  // ===== Download =====
  const handleDownload = async () => {
    try {
      const res = await documentApi.getDownloadLink(document.id);
      const { url } = res.data.data;
      window.open(url, "_blank");
    } catch {
      toast.error("Bạn không có quyền tải tài liệu này hoặc liên kết đã hết hạn.");
    }
  };

  // ===== Publish =====
  const handlePublish = async () => {
    try {
      setIsPublishing(true);

      await axiosClient.patch(`/documents/${document.id}/publish`);

      toast.success("Tài liệu đã được công khai!");

      // Refetch list
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    } catch {
      toast.error("Không thể công khai tài liệu.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="p-4 flex flex-row items-center space-x-3 space-y-0">
        <div className="p-2 bg-blue-50 rounded-lg">
          <FileText className="text-blue-600" size={24} />
        </div>

        <div className="flex-1 min-w-0">
          <CardTitle className="text-sm font-semibold truncate">
            {document.title}
          </CardTitle>

          <div className="flex items-center text-xs text-slate-500 mt-1">
            <Clock size={12} className="mr-1" />
            {new Date(document.createdAt).toLocaleDateString("vi-VN")}
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 py-2">
        <p className="text-xs text-slate-600 line-clamp-2 min-h-[32px]">
          {document.description || "Không có mô tả cho tài liệu này."}
        </p>

        {isDraft && (
          <div className="mt-2 flex items-center text-amber-600 text-[10px] font-bold uppercase">
            <Lock size={10} className="mr-1" /> Bản nháp (Chỉ bạn thấy)
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        {/* Download */}
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2 text-xs"
          onClick={handleDownload}
        >
          <Download size={14} /> Tải xuống
        </Button>

        {/* Publish */}
        {isDraft && (
          <Button
            size="sm"
            className="w-full gap-2 text-xs bg-green-600 hover:bg-green-700"
            onClick={handlePublish}
            disabled={isPublishing}
          >
            {isPublishing ? "Đang xử lý..." : "Công khai ngay"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}