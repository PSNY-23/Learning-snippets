"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const CheckAuth = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  if (loading) return <p>Loading...</p>;

  if (user) return null;

  return <>{children}</>;
};
