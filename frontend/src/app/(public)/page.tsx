"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Trophy, ArrowRight } from "lucide-react";

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
          <h1 className="text-5xl font-black tracking-tight">
            <span className="
                bg-gradient-to-r
                from-indigo-500
                via-purple-500
                to-pink-500
                bg-clip-text
                text-transparent
                drop-shadow-[0_0_20px_rgba(99,102,241,0.35)]
            ">
              Thư viện tài liệu trực tuyến
            </span>
          </h1>

          <p className="mt-4 text-lg text-slate-500">
            Khám phá và tải về hàng ngàn tài liệu miễn phí.
          </p>
        </div>

        {isAuthenticated && (
          <Link href="/gamification">
            <Button 
              size="lg"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-6 py-3 font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/35 active:scale-[0.98]"
            >
              <Trophy className="mr-2 h-5 w-5 text-amber-300 transition-transform group-hover:rotate-12" />
              <span>View Gamification</span>
              <ArrowRight className="ml-2 h-4 w-4 opacity-70 transition-transform group-hover:translate-x-1" />
            </Button>
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