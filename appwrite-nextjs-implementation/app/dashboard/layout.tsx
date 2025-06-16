import { ProtectedRoute } from "@/components/ProtectedRoute";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default DashboardLayout;
