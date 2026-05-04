import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axiosClient from "@/shared/api/axios-client";

type RegisterRequest = {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
};

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const register = async (data: RegisterRequest) => {
    setIsLoading(true);
    try {
      await axiosClient.post("/auth/register", data);
      toast.success("Đăng ký thành công! Hãy đăng nhập.");
      router.push("/login");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading };
};