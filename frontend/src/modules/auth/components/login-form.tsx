"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "../schemas/login.schema";
import { useLogin } from "../hooks/use-login";
import { Loader2, LogIn } from "lucide-react"; 

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const { login, isLoading } = useLogin();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginSchemaType) {
    await login(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Field: Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-slate-700 dark:text-slate-200 transition-colors duration-300">
                Email
              </FormLabel>
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
        
        {/* Field: Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-slate-700 dark:text-slate-200 transition-colors duration-300">
                Mật khẩu
              </FormLabel>
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

        {/* Nút Đăng nhập */}
        <Button 
          type="submit" 
          disabled={isLoading}
          className="group relative mt-2 w-full h-12 rounded-xl border-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 font-bold text-white shadow-lg shadow-indigo-500/25 dark:shadow-none transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/35 active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Đang đăng nhập...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Đăng nhập
              <LogIn className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
          )}
        </Button>
        
      </form>
    </Form>
  );
}