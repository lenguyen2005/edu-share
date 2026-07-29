import { LoginForm } from "@/modules/auth/components/login-form";
import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50/80 via-purple-50/60 to-pink-50/80 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 transition-colors duration-300 overflow-hidden">
      
      {/* Nút quay lại trang chủ */}
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 shadow-sm transition-all duration-300 hover:bg-white dark:hover:bg-slate-700 hover:shadow hover:-translate-x-1 dark:border dark:border-slate-700 z-50">
        <ArrowLeft className="h-4 w-4" /> Về trang chủ
      </Link>

      {/* Họa tiết Aurora (Mây mờ) */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-300/50 dark:bg-indigo-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-300/50 dark:bg-fuchsia-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-pulse delay-1000 pointer-events-none"></div>

      {/* Card chứa Form */}
      <div className="relative z-10 w-full max-w-md rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 shadow-2xl shadow-indigo-100/50 dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white dark:border-slate-800 transition-all duration-300">
        
        {/* Header của Form */}
        <div className="text-center mb-8 space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-200 dark:shadow-none mb-5 transition-transform hover:scale-105 hover:rotate-3 duration-300 cursor-pointer">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight transition-colors duration-300">
            Chào mừng trở lại
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors duration-300">
            Vui lòng đăng nhập để quản lý tài liệu của bạn
          </p>
        </div>

        {/* Component Form */}
        <LoginForm />

        {/* Footer chuyển hướng Đăng ký */}
        <div className="mt-8 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
          Chưa có tài khoản?{" "}
          <Link href="/register" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline transition-colors duration-300">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
}