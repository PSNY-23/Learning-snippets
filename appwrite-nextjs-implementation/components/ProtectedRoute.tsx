"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // const router = useRouter();
  // const { user, loading, error } = useUser();

  // useEffect(() => {
  //   if (!loading && !user) {
  //     router.push("/login");
  //   }
  // }, [ router]);

  // if (loading) {
  //   return <p className="flex h-screen items-center justify-center w-full">Loading...</p>;
  // }

  // if (error && !user) {
  //   return (
  //     <p className="flex h-screen items-center justify-center w-full text-red-500">
  //       {error}
  //     </p>
  //   );
  // }

  return <>{children}</>;
};
