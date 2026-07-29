"use client";

import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UserPlus, ArrowLeft } from "lucide-react"; // Thêm icons

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/modules/auth/hooks/use-register";

// Validation Schema
const registerSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  confirmPassword: z.string()
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu xác nhận không khớp",
      });
    }
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register, isLoading } = useRegister();

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterValues) {
    await register({
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      fullName: values.name,
    });
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50/80 via-purple-50/60 to-pink-50/80 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 transition-colors duration-300 overflow-hidden">
      
      {/* Nút quay lại trang chủ */}
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 shadow-sm transition-all duration-300 hover:bg-white dark:hover:bg-slate-700 hover:shadow hover:-translate-x-1 dark:border dark:border-slate-700 z-50">
        <ArrowLeft className="h-4 w-4" /> Về trang chủ
      </Link>

      {/* Họa tiết Aurora (Mây mờ) */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-300/50 dark:bg-indigo-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-300/50 dark:bg-fuchsia-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-pulse delay-1000 pointer-events-none"></div>

      {/* Khung chứa Form */}
      <div className="relative z-10 w-full max-w-md rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 shadow-2xl shadow-indigo-100/50 dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white dark:border-slate-800 transition-all duration-300 mt-12 md:mt-0">
        
        {/* Header */}
        <div className="text-center mb-8 space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-200 dark:shadow-none mb-5 transition-transform hover:scale-105 hover:rotate-3 duration-300 cursor-pointer">
            <UserPlus className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight transition-colors duration-300">
            Tạo tài khoản
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors duration-300">
            Nhập thông tin bên dưới để bắt đầu chia sẻ tài liệu
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Họ tên */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-slate-700 dark:text-slate-200 transition-colors duration-300">Họ và tên</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Nguyễn Văn A" 
                      className="h-12 rounded-xl border-slate-200 dark:border-slate-700/60 bg-white/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 transition-all duration-300"
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-slate-700 dark:text-slate-200 transition-colors duration-300">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="name@example.com" 
                      className="h-12 rounded-xl border-slate-200 dark:border-slate-700/60 bg-white/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 transition-all duration-300"
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Mật khẩu */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-slate-700 dark:text-slate-200 transition-colors duration-300">Mật khẩu</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="h-12 rounded-xl border-slate-200 dark:border-slate-700/60 bg-white/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 transition-all duration-300"
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Xác nhận mật khẩu */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-slate-700 dark:text-slate-200 transition-colors duration-300">Xác nhận mật khẩu</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="h-12 rounded-xl border-slate-200 dark:border-slate-700/60 bg-white/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 transition-all duration-300"
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Nút Submit */}
            <Button 
              type="submit" 
              className="group relative mt-6 w-full h-12 rounded-xl border-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 font-bold text-white shadow-lg shadow-indigo-500/25 dark:shadow-none transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/35 active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100" 
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Đang xử lý...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Đăng ký ngay
                  <UserPlus className="h-5 w-5 transition-transform group-hover:scale-110" />
                </span>
              )}
            </Button>
          </form>
        </Form>

        {/* Footer chuyển hướng Đăng nhập */}
        <div className="mt-8 text-center text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors duration-300">
          Đã có tài khoản?{" "}
          <Link href="/login" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline transition-colors duration-300">
            Đăng nhập ngay
          </Link>
        </div>

      </div>
    </div>
  );
}