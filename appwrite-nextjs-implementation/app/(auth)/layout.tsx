import React from "react";
import { CheckAuth } from "./_components/CheckAuth";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <CheckAuth>{children}</CheckAuth>;
};

export default AuthLayout;
