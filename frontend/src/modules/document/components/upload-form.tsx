"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  UploadCloud, 
  FileText, 
  X, 
  FileUp, 
  Sparkles, 
  Globe, 
  Lock, 
  FolderTree,
  Loader2
} from "lucide-react";

import { useCategoryTree } from "@/modules/category/hooks/use-category-tree";
import { useUploadDocument } from "../hooks/use-upload-document";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

/* ================= SCHEMA ================= */
const uploadSchema = z.object({
  title: z.string().min(5, "Tiêu đề phải có ít nhất 5 ký tự"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Vui lòng chọn danh mục"),
  file: z
    .instanceof(File, { message: "Vui lòng chọn 1 tập tin" })
    .refine((file) => file.size > 0, "File không hợp lệ")
    .refine((file) => file.size <= 10 * 1024 * 1024, "File tối đa 10MB"),
  isPublished: z.boolean(),
});

type UploadSchemaType = z.infer<typeof uploadSchema>;

/* ================= HELPER ================= */
type Category = {
  id: string;
  name: string;
  children?: Category[];
};

function buildOptions(categories: Category[], level = 0): React.ReactNode[] {
  return categories.flatMap((cat) => [
    <option
      key={cat.id}
      value={cat.id}
      disabled={Boolean(cat.children && cat.children.length > 0)}
      className="dark:bg-slate-900"
    >
      {"\u00A0\u00A0".repeat(level)}{level > 0 ? "└─ " : ""}{cat.name}
    </option>,

    ...(cat.children?.length
      ? buildOptions(cat.children, level + 1)
      : []),
  ]);
}

/* ================= COMPONENT ================= */
export function UploadForm() {
  const { data: categories } = useCategoryTree();
  const { mutateAsync, isPending } = useUploadDocument();
  const router = useRouter();

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const form = useForm<UploadSchemaType>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      file: undefined as unknown as File,
      isPublished: true,
    },
  });

  const selectedFile = useWatch({
    control: form.control,
    name: "file",
  });

  const categoryOptions = useMemo(() => {
    if (!categories) return null;
    return buildOptions(categories);
  }, [categories]);

  async function onSubmit(values: UploadSchemaType) {
    try {
      setUploadProgress(0);
      await mutateAsync({
        file: values.file,
        metadata: {
          title: values.title,
          description: values.description,
          categoryId: values.categoryId,
          status: values.isPublished ? "PUBLISHED" : "DRAFT",
        },
        onProgress: (progress) => {
          setUploadProgress(progress);
        },
      });

      form.reset();
      setUploadProgress(0);
      router.push("/");
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadProgress(0);
    }
  }

  // Helper tính kích thước file
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none backdrop-blur-sm transition-colors duration-300">
      {/* Form Header */}
      <div className="mb-8 flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6 transition-colors duration-300">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-200 dark:shadow-none">
          <FileUp className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-800 dark:text-slate-100 transition-colors duration-300">Tải lên tài liệu mới</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">Chia sẻ kiến thức và tài liệu học tập với cộng đồng</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-slate-700 dark:text-slate-200">Tiêu đề tài liệu <span className="text-rose-500">*</span></FormLabel>
                <FormControl>
                  <Input 
                    placeholder="VD: Giáo trình Giải tích 1 - ĐH Bách Khoa" 
                    className="h-11 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500/20 transition-colors duration-300"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-slate-700 dark:text-slate-200">Danh mục <span className="text-rose-500">*</span></FormLabel>
                <FormControl>
                  <div className="relative">
                    <select
                      {...field}
                      className="h-11 w-full appearance-none rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 text-sm font-medium text-slate-700 dark:text-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-colors duration-300"
                    >
                      <option value="" className="dark:bg-slate-900">-- Chọn danh mục tài liệu --</option>
                      {categoryOptions}
                    </select>
                    <FolderTree className="pointer-events-none absolute right-3 top-3 h-5 w-5 text-slate-400 dark:text-slate-500" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-slate-700 dark:text-slate-200">Mô tả chi tiết</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tóm tắt nội dung tài liệu, môn học liên quan, năm xuất bản..."
                    className="min-h-[100px] resize-none rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500/20 transition-colors duration-300"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Drag & Drop File Upload */}
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-slate-700 dark:text-slate-200">Tập tin đính kèm <span className="text-rose-500">*</span></FormLabel>
                <FormControl>
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      const file = e.dataTransfer.files?.[0];
                      if (file) field.onChange(file);
                    }}
                    className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 transition-all duration-300 ${
                      isDragging 
                        ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20 scale-[1.01]" 
                        : "border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                  >
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png"
                      className="absolute inset-0 cursor-pointer opacity-0"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) field.onChange(file);
                      }}
                    />

                    {!selectedFile ? (
                      <div className="text-center transition-colors duration-300">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100/80 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 transition-colors duration-300">
                          <UploadCloud className="h-6 w-6" />
                        </div>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors duration-300">
                          Kéo thả file vào đây hoặc <span className="text-indigo-600 dark:text-indigo-400 hover:underline">Duyệt file</span>
                        </p>
                        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500 transition-colors duration-300">
                          Hỗ trợ PDF, Word, Excel, PowerPoint, Ảnh (Tối đa 10MB)
                        </p>
                      </div>
                    ) : (
                      <div className="flex w-full items-center justify-between rounded-xl border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/60 dark:bg-indigo-900/20 p-3.5 transition-colors duration-300">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div className="truncate">
                            <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-200 transition-colors duration-300">{selectedFile.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors duration-300">{formatFileSize(selectedFile.size)}</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-rose-500 dark:hover:text-rose-400 transition-colors duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            field.onChange(undefined);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Switch Publish Card */}
          <FormField
            control={form.control}
            name="isPublished"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/50 p-4 transition-colors duration-300 hover:bg-slate-50 dark:hover:bg-slate-800">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 ${field.value ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" : "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"}`}>
                    {field.value ? <Globe className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                  </div>
                  <div>
                    <FormLabel className="cursor-pointer text-sm font-semibold text-slate-800 dark:text-slate-200 transition-colors duration-300">
                      {field.value ? "Công khai tài liệu" : "Chế độ riêng tư (Nháp)"}
                    </FormLabel>
                    <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors duration-300">
                      {field.value ? "Mọi người đều có thể tìm kiếm và xem tài liệu này" : "Chỉ mình bạn có thể xem lại tài liệu này"}
                    </p>
                  </div>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(val) => field.onChange(val === true)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Upload Progress Bar */}
          {isPending && (
            <div className="space-y-2 rounded-xl bg-indigo-50/50 dark:bg-indigo-900/20 p-4 border border-indigo-100 dark:border-indigo-900/50 transition-colors duration-300">
              <div className="flex justify-between text-xs font-semibold text-indigo-900 dark:text-indigo-300 transition-colors duration-300">
                <span className="flex items-center gap-1.5">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  {uploadProgress < 100 ? "Đang tải file lên Cloud..." : "Đang xử lý dữ liệu..."}
                </span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-indigo-200/60 dark:bg-indigo-950/60 transition-colors duration-300">
                <div
                  className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isPending}
            className="group relative w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 font-bold text-white shadow-lg shadow-indigo-500/25 dark:shadow-none transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-indigo-500/35 active:scale-[0.99] disabled:opacity-70"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Đang xử lý tải lên...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-300 transition-transform group-hover:rotate-12" />
                Xác nhận đăng tài liệu
              </span>
            )}
          </Button>

        </form>
      </Form>
    </div>
  );
}