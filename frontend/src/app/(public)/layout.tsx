"use client";
import { CategorySidebar } from "@/modules/category/components/category-sidebar";
import { useAuthStore } from "@/modules/auth/store/use-auth-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLogout } from "@/modules/auth/hooks/use-logout";


export default function PublicLayout({ children }: { children: React.ReactNode }) {
  
  const { isAuthenticated, user, hasHydrated } = useAuthStore();
  const logout = useLogout();
  if (!hasHydrated) return null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar luôn hiện để khách xem danh mục */}
      <CategorySidebar onSelectCategory={(id) => {
        // Logic điều hướng hoặc filter tại đây
        window.dispatchEvent(new CustomEvent("filter-category", { detail: id }));
      }} />

      <div className="flex-1 flex flex-col">
        {/* Header điều hướng */}
        <header className="h-16 border-b bg-white flex items-center justify-between px-8 sticky top-0 z-10">
          <Link href="/" className="font-bold text-xl text-blue-600">EDU-SHARE</Link>
          
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link href="/upload">
                  <Button variant="default" size="sm">Đăng tài liệu</Button>
                </Link>
                <span className="text-sm font-medium">Chào, {user?.fullName}</span>
                <Button variant="default" size="sm" onClick={logout}>Đăng xuất</Button>
              </>
            ) : (
              <Link href="/login">
                <Button variant="default" size="sm">Đăng nhập để đóng góp</Button>
              </Link>
            )}
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}