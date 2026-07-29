"use client";

import Link from "next/link";
import { Upload, LogOut, User, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CategorySidebar } from "@/modules/category/components/category-sidebar";
import { useAuthStore } from "@/modules/auth/store/use-auth-store";
import { useLogout } from "@/modules/auth/hooks/use-logout";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken, user, isInitializing } = useAuthStore();

  const isAuthenticated = !!accessToken;
  const logout = useLogout();

  if (isInitializing) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">

      {/* Sidebar */}
      <CategorySidebar
        onSelectCategory={(id) => {
          window.dispatchEvent(
            new CustomEvent("filter-category", {
              detail: id,
            })
          );
        }}
      />

      <div className="relative flex flex-1 flex-col overflow-hidden">

        {/* Header */}
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-950/70 px-8 shadow-sm backdrop-blur-md transition-all duration-300">
          <Link href="/" className="group flex items-center gap-2">
            <div className="rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 p-1.5 shadow-md transition-all group-hover:-translate-y-0.5 group-hover:shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-indigo-700 dark:from-indigo-400 to-purple-600 dark:to-purple-400 bg-clip-text text-xl font-black tracking-tight text-transparent">
              EDU-SHARE
            </span>
          </Link>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link href="/upload">
                  <Button className="gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-5 text-white">
                    <Upload className="h-4 w-4" />
                    Đăng tài liệu
                  </Button>
                </Link>
              
                <div className="ml-2 flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-4">
                  <div className="flex flex-col text-right">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                      {user?.fullName}
                    </span>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-indigo-50 dark:bg-indigo-900/30">
                    <User className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  title="Đăng xuất"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button className="gap-2 rounded-full bg-indigo-600 px-6 text-white">
                  <User className="h-4 w-4" />
                  Đăng nhập để đóng góp
                </Button>
              </Link>
            )}
          </div>
        </header>

        {/* Theme Toggle */}
        <header className="flex h-12 items-center justify-end border-b border-slate-200/60 px-8 dark:border-slate-800/60">
          <ThemeToggle />
        </header>
        <main className="mx-auto w-full max-w-7xl animate-in fade-in p-8 duration-500">
          {children}
        </main>
      </div>
    </div>
  );
}