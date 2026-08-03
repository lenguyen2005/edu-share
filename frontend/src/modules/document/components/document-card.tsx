"use client";
//Test CI/CD pipeline

import { useRouter } from "next/navigation";
import {
  Clock,
  Download,
  FileText,
  Globe,
  Lock,
  Trash2,
} from "lucide-react";

import { useAuthStore } from "@/modules/auth/store/use-auth-store";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";

import { useDeleteDocument } from "../hooks/use-delete-document";
import { useDownloadDocument } from "../hooks/use-download-document";
import { usePublishDocument } from "../hooks/use-publish-document";
import { DocumentDto } from "../types/document.dto";

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
      onClick={handleOpenDocument}
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-slate-200/70
        dark:border-slate-800/70
        bg-white/95
        dark:bg-slate-900/90
        backdrop-blur
        cursor-pointer

        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-indigo-200
        dark:hover:border-indigo-500/50
        hover:shadow-2xl
        hover:shadow-indigo-100/60
        dark:hover:shadow-indigo-900/20
      "
    >
      {/* Gradient Accent */}
      <div
        className="
          absolute
          inset-x-0
          top-0
          h-1
          bg-gradient-to-r
          from-indigo-500
          via-violet-500
          to-cyan-500
        "
      />

      {/* Soft Background */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-white
          via-white
          to-slate-50/80
          dark:from-slate-900/50
          dark:via-slate-900/20
          dark:to-slate-950/80
          opacity-90
          pointer-events-none
        "
      />

      <CardHeader className="relative flex flex-row items-start gap-4 p-6 pb-4">
        {/* Icon */}
        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl

            bg-gradient-to-br
            from-indigo-500/10
            via-violet-500/10
            to-cyan-500/10
            dark:from-indigo-500/20
            dark:via-violet-500/20
            dark:to-cyan-500/20

            text-indigo-600
            dark:text-indigo-400

            transition-all
            duration-300

            group-hover:scale-110
            group-hover:rotate-3
            group-hover:bg-gradient-to-br
            group-hover:from-indigo-600
            group-hover:to-violet-600
            group-hover:text-white
            group-hover:shadow-lg
          "
        >
          <FileText
            className="stroke-[1.7]"
            size={22}
          />
        </div>

        {/* Information */}
        <div className="min-w-0 flex-1">
          <CardTitle
            className="
              truncate
              text-lg
              font-extrabold
              tracking-tight
              text-slate-800
              dark:text-slate-100

              transition-colors

              group-hover:text-indigo-700
              dark:group-hover:text-indigo-400
            "
          >
            {document.title}
          </CardTitle>

          <div className="mt-2 flex items-center gap-2 text-xs font-medium text-slate-400 dark:text-slate-500">
            <Clock className="h-3.5 w-3.5" />

            <span>{formattedDate}</span>
          </div>
        </div>

        {/* File Badge */}
        <div
          className="
            rounded-full
            border
            border-indigo-100
            dark:border-indigo-500/30
            bg-indigo-50
            dark:bg-indigo-900/30
            px-2.5
            py-0.5

            text-[10px]
            font-bold
            uppercase
            tracking-wider

            text-indigo-600
            dark:text-indigo-400
          "
        >
          PDF
        </div>
      </CardHeader>

      <CardContent className="relative px-5 pb-3">
        <p
          className="
            min-h-[40px]
            line-clamp-2

            text-sm
            leading-7
            text-slate-600
            dark:text-slate-400
          "
        >
          {document.description ??
            "Chưa có mô tả cho tài liệu này."}
        </p>

        <div className="mt-3 flex items-center justify-between">
          {isDraft ? (
            <div
              className="
                inline-flex
                items-center
                gap-1.5

                rounded-full
                border
                border-amber-200
                dark:border-amber-500/30

                bg-amber-50
                dark:bg-amber-900/20

                px-2.5
                py-1

                text-[10px]
                font-bold
                uppercase
                tracking-widest

                text-amber-700
                dark:text-amber-400
              "
            >
              <Lock
                size={11}
                className="stroke-[2]"
              />

              Bản nháp
            </div>
          ) : (
            <div
              className="
                inline-flex
                items-center
                rounded-full

                border
                border-emerald-200
                dark:border-emerald-500/30

                bg-emerald-50
                dark:bg-emerald-900/20

                px-3
                py-1

                text-[10px]
                font-bold
                uppercase
                tracking-widest

                text-emerald-700
                dark:text-emerald-400
              "
            >
              <Globe
                size={11}
                className="mr-1"
              />

              Công khai
            </div>
          )}

          <span className="text-xs text-slate-400 dark:text-slate-500">
            Nhấn để xem chi tiết
          </span>
        </div>

        <div className="mt-4 border-t border-slate-100 dark:border-slate-800" />
      </CardContent>
      <CardFooter className="relative flex flex-col gap-3 px-6 pb-6 pt-0">
        {/* Download */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          disabled={downloadDocument.isPending}
          className="
            h-10
            w-full
            rounded-xl

            border-slate-200
            dark:border-slate-700

            bg-white/80
            dark:bg-transparent

            text-sm
            font-semibold
            text-slate-700
            dark:text-slate-300

            transition-all
            duration-300

            hover:border-indigo-300
            dark:hover:border-indigo-700
            hover:bg-indigo-50
            dark:hover:bg-indigo-900/30
            hover:text-indigo-700
            dark:hover:text-indigo-300
          "
        >
          <Download
            size={16}
            className={cn(
              "mr-2 transition-transform",
              downloadDocument.isPending && "animate-bounce",
            )}
          />

          {downloadDocument.isPending
            ? "Đang lấy liên kết..."
            : "Tải xuống"}
        </Button>

        {/* Publish */}
        {isDraft && (
          <Button
            size="sm"
            onClick={handlePublish}
            disabled={publishDocument.isPending}
            className="
              h-11
              w-full
              rounded-xl

              border-0

              bg-gradient-to-r
              from-emerald-500
              via-green-500
              to-emerald-600

              text-sm
              font-semibold
              text-white

              shadow-md
              shadow-emerald-200/70
              dark:shadow-emerald-900/30

              transition-all
              duration-300

              hover:scale-[1.02]
              hover:shadow-xl
              hover:shadow-emerald-300/50
              dark:hover:shadow-emerald-900/50

              active:scale-95
            "
          >
            <Globe
              size={16}
              className={cn(
                "mr-2",
                publishDocument.isPending && "animate-spin",
              )}
            />

            {publishDocument.isPending
              ? "Đang xử lý..."
              : "Công khai ngay"}
          </Button>
        )}

        {/* Delete */}
        {isOwner && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={deleteDocument.isPending}
            className="
              h-10
              w-full
              rounded-xl

              text-sm
              font-medium

              text-slate-400
              dark:text-slate-500

              transition-all
              duration-300

              hover:bg-red-50
              dark:hover:bg-red-900/20
              hover:text-red-600
              dark:hover:text-red-400

              disabled:opacity-50
            "
          >
            <Trash2
              size={16}
              className="mr-2"
            />

            {deleteDocument.isPending
              ? "Đang xóa..."
              : "Xóa tài liệu"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}