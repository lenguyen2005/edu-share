"use client";
import { useState } from "react";
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
import { useUploadDocument } from "../hooks/use-upload-document";
import { UploadCloud } from "lucide-react";

export function UploadDialog({ categoryId }: { categoryId: string }) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const { upload, isUploading } = useUploadDocument();

  const handleUpload = async () => {
    if (!file || !title) return;
    const success = await upload({ title, categoryId, file, status: "DRAFT" });
    if (success) {
      setOpen(false); // Đóng modal nếu thành công
      setFile(null);
      setTitle("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <UploadCloud size={18} /> Tải tài liệu lên
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tải tài liệu mới</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Tiêu đề</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nhập tiêu đề tài liệu..." />
          </div>
          <div className="grid gap-2">
            <Label>Tập tin</Label>
            <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </div>
          <Button onClick={handleUpload} disabled={isUploading || !file || !title}>
            {isUploading ? "Đang xử lý..." : "Bắt đầu tải lên"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}