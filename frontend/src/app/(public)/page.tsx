"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { DocumentList } from "@/modules/document/components/document-list";
import { GamificationCard } from "@/modules/gamification/components/gamification-card";

import { useAuthStore } from "@/modules/auth/store/use-auth-store";

export default function HomePage() {
  const [selectedCatId, setSelectedCatId] = useState("");

  const { accessToken } = useAuthStore();

  const isAuthenticated = !!accessToken;

  useEffect(() => {
    const handleFilter = (e: CustomEvent<string>) =>
      setSelectedCatId(e.detail);

    window.addEventListener(
      "filter-category",
      handleFilter as EventListener,
    );

    return () => {
      window.removeEventListener(
        "filter-category",
        handleFilter as EventListener,
      );
    };
  }, []);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Thư viện tài liệu trực tuyến
          </h1>

          <p className="text-slate-500">
            Khám phá và tải về hàng ngàn tài liệu miễn phí.
          </p>
        </div>

        {isAuthenticated && (
          <Link href="/gamification">
            <Button>View Gamification</Button>
          </Link>
        )}
      </div>

      {isAuthenticated && (
        <GamificationCard />
      )}

      <DocumentList categoryId={selectedCatId} />
    </div>
  );
}