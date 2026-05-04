"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMemo } from "react";

import { useCategoryTree } from "@/modules/category/hooks/use-category-tree";
import { useUploadDocument } from "../hooks/use-upload-document";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
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
      disabled={cat.children && cat.children.length > 0} // chỉ chọn leaf
    >
      {"— ".repeat(level)}
      {cat.name}
    </option>,

    ...(cat.children?.length
      ? buildOptions(cat.children, level + 1)
      : []),
  ]);
}

/* ================= COMPONENT ================= */
export function UploadForm() {
  const { data: categories } = useCategoryTree();
  const { upload, isUploading } = useUploadDocument();
  const router = useRouter();

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

  /* Memo để tránh build lại tree mỗi render */
  const categoryOptions = useMemo(() => {
    if (!categories) return null;
    return buildOptions(categories);
  }, [categories]);

  async function onSubmit(values: UploadSchemaType) {
    const success = await upload({
      title: values.title,
      description: values.description,
      categoryId: values.categoryId,
      file: values.file,
      status: values.isPublished ? "PUBLISHED" : "DRAFT",
    });

    if (success) {
      form.reset();
      router.push("/");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-6 rounded-lg border shadow-sm"
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tiêu đề tài liệu</FormLabel>
              <FormControl>
                <Input placeholder="VD: Giáo trình Giải tích 1" {...field} />
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
              <FormLabel>Danh mục</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full p-2 border rounded-md text-sm bg-white"
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categoryOptions}
                </select>
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
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Mô tả ngắn gọn về tài liệu..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* File */}
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tập tin</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) field.onChange(file);
                  }}
                />
              </FormControl>

              {selectedFile && (
                <p className="text-sm text-gray-500 mt-1">
                  📄 {selectedFile.name}
                </p>
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Publish */}
        <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <FormItem className="flex justify-between items-center border p-4 rounded-lg">
              <div>
                <FormLabel>Công khai tài liệu</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Cho phép người khác xem ngay
                </p>
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

        {/* Submit */}
        <Button type="submit" className="w-full" disabled={isUploading}>
          {isUploading ? "Đang tải lên..." : "Xác nhận đăng tài liệu"}
        </Button>
      </form>
    </Form>
  );
}