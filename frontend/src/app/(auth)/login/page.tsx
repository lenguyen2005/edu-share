import { LoginForm } from "@/modules/auth/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md space-y-8 rounded-xl border bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Chào mừng trở lại</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Vui lòng đăng nhập để quản lý tài liệu của bạn
          </p>
        </div>
        
        <LoginForm />
        
        <p className="text-center text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <a href="/register" className="font-medium text-primary hover:underline">
            Đăng ký ngay
          </a>
        </p>
      </div>
    </div>
  );
}