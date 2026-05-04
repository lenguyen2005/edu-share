"use client";

import { AuthGuard } from "@/shared/components/auth-guard";
import { UploadForm } from "@/modules/document/components/upload-form";
import { useEffect } from "react";
import { useAuthStore } from "@/modules/auth/store/use-auth-store";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const { isAuthenticated, hasHydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated) return null;
  if (!isAuthenticated) return null;

  return (
    <AuthGuard>
      <div className="max-w-2xl mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Tải lên tài liệu mới</h1>
        <UploadForm />
      </div>
    </AuthGuard>
  );
}