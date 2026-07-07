"use client";

import { useRouter } from "next/navigation";
import { Clock, Download, FileText, Lock, Trash2 } from "lucide-react";

import { useAuthStore } from "@/modules/auth/store/use-auth-store";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DocumentDto } from "../types/document.dto";
import { useDownloadDocument } from "../hooks/use-download-document";
import { usePublishDocument } from "../hooks/use-publish-document";
import { useDeleteDocument } from "../hooks/use-delete-document";

interface DocumentCardProps {
  document: DocumentDto;
}

export function DocumentCard({
  document,
}: DocumentCardProps) {
  const router = useRouter();

  const publishDocument = usePublishDocument();
  const downloadDocument = useDownloadDocument();
  const deleteDocument = useDeleteDocument();

  const isDraft = document.status === "DRAFT";

  const currentUser = useAuthStore((state) => state.user);

  const isOwner = currentUser?.id === document.author.id;

  const formattedDate = new Date(
    document.createdAt,
  ).toLocaleDateString("vi-VN");

  const handleOpenDocument = () => {
    router.push(`/documents/${document.id}`);
  };

  const handleDownload = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();

    downloadDocument.mutate(document.id);
  };

  const handlePublish = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();

    publishDocument.mutate(document.id);
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();

    if (!confirm("Bạn có chắc chắn muốn xóa tài liệu này?")) {
      return;
    }

    deleteDocument.mutate(document.id);
  };

  return (
    <Card
      className="cursor-pointer overflow-hidden transition-shadow hover:shadow-md"
      onClick={handleOpenDocument}
    >
      <CardHeader className="flex flex-row items-center space-x-3 space-y-0 p-4">
        <div className="rounded-lg bg-blue-50 p-2">
          <FileText
            size={24}
            className="text-blue-600"
          />
        </div>

        <div className="min-w-0 flex-1">
          <CardTitle className="truncate text-sm font-semibold">
            {document.title}
          </CardTitle>

          <div className="mt-1 flex items-center text-xs text-slate-500">
            <Clock
              size={12}
              className="mr-1"
            />
            {formattedDate}
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 py-2">
        <p className="min-h-[32px] line-clamp-2 text-xs text-slate-600">
          {document.description ??
            "Không có mô tả cho tài liệu này."}
        </p>

        {isDraft && (
          <div className="mt-2 flex items-center text-[10px] font-bold uppercase text-amber-600">
            <Lock
              size={10}
              className="mr-1"
            />
            Bản nháp (Chỉ bạn thấy)
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-2 p-4 pt-0">
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2 text-xs"
          onClick={handleDownload}
          disabled={downloadDocument.isPending}
        >
          <Download size={14} />
          {downloadDocument.isPending
            ? "Đang lấy liên kết..."
            : "Tải xuống"}
        </Button>

        {isDraft && (
          <Button
            size="sm"
            className="w-full gap-2 bg-green-600 text-xs hover:bg-green-700"
            onClick={handlePublish}
            disabled={publishDocument.isPending}
          >
            {publishDocument.isPending
              ? "Đang xử lý..."
              : "Công khai ngay"}
          </Button>
        )}

        {isOwner && (
          <Button
            variant="destructive"
            size="sm"
            className="w-full gap-2 text-xs"
            onClick={handleDelete}
            disabled={deleteDocument.isPending}
          >
            <Trash2 size={14} />
            {deleteDocument.isPending ? "Đang xóa..." : "Xóa"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}