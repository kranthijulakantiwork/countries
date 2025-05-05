"use client";

import { selectIsAuthenticated } from "src/store/features/auth-slice";
import { useAppSelector } from "src/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRequireAuth() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login with return URL
      const returnUrl = encodeURIComponent(window.location.pathname);
      router.push(`/login?returnUrl=${returnUrl}`);
    }
  }, [isAuthenticated, router]);

  return isAuthenticated;
}
