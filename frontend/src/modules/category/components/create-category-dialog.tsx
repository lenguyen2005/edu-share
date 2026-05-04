"use client";

import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useCategoryTree } from "../hooks/use-category-tree";
import { useCreateCategory } from "../hooks/use-create-category";
import { CategoryTreeDto } from "../types/category.type";

type FlatCategory = CategoryTreeDto & {
  label: string;
};

const flattenCategories = (
  categories: CategoryTreeDto[],
  level = 0
): FlatCategory[] => {
  return categories.reduce<FlatCategory[]>((acc, cat) => {
    acc.push({
      ...cat,
      label: `${"— ".repeat(level)}${cat.name}`,
    });

    if (cat.children?.length) {
      acc.push(...flattenCategories(cat.children, level + 1));
    }

    return acc;
  }, []);
};

export function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState<string>("");

  const { data: tree = [] } = useCategoryTree();
  const { mutate: createCategory, isPending } = useCreateCategory();

  const flatCategories = useMemo(() => {
    return flattenCategories(tree);
  }, [tree]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createCategory(
      {
        name: name.trim(),
        parentId: parentId || undefined,
      },
      {
        onSuccess: () => {
          setOpen(false);
          setName("");
          setParentId("");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Plus size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm danh mục mới</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Tên danh mục</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Công nghệ thông tin"
              required
            />
          </div>

          {/* Parent */}
          <div className="space-y-2">
            <Label htmlFor="parent">
              Danh mục cha (Để trống nếu là gốc)
            </Label>
            <select
              id="parent"
              className="w-full p-2 border rounded-md text-sm bg-white"
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
            >
              <option value="">-- Danh mục gốc --</option>
              {flatCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Đang xử lý..." : "Tạo danh mục"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}