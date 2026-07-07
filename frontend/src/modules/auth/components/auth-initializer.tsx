"use client";

import { useEffect } from "react";
import { authApi } from "@/modules/auth/api/auth.api";
import { useAuthStore } from "@/modules/auth/store/use-auth-store";

export function AuthInitializer() {

    const {
        setAuth,
        logout,
        finishInitializing,
    } = useAuthStore();

    useEffect(() => {

        authApi.refreshSession()

            .then((res) => {

                setAuth(
                    res.data.user,
                    res.data.accessToken,
                );

            })

            .catch(() => {

                logout();

            })

            .finally(() => {

                finishInitializing();

            });

    }, [setAuth, logout, finishInitializing]);

    return null;
}