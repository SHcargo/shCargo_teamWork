"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { decodeToken, useJwt } from "react-jwt";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [token] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  );
  const { decodedToken, isExpired } = useJwt(token || "");
  useEffect(() => {
    const checkTokenAndRoute = () => {
      if (!token || isExpired) {
        router.push("/logIn");
      }
      if (pathname === "/logIn" && decodedToken) {
        router.push("/");
      }
    };

    checkTokenAndRoute();
  }, [token, isExpired, decodedToken]);

  return <>{children}</>;
};

export default AuthProvider;
