"use client";

import { jwtDecode } from "jwt-decode";
import { useState, useEffect, createContext, useContext } from "react";

type DecodedToken = {
  phoneNumber: string;
  role: string;
  userId: string;
  name: string;
  createdAt: string; // usually ISO string in JWT
  userEmail: string;
};

type UserContextType = {
  phoneNumber?: string;
  role?: string;
  userId?: string;
  name?: string;
  getUser: () => Promise<void>;
  loading: boolean;
  createdAt?: string;
  userEmail?: string;
};

const getDecodedToken = (token: string | null): DecodedToken | null => {
  if (!token) return null;

  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [client, setClient] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    setLoading(true);
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setClient(null);
      setLoading(false);
      return;
    }

    const user = getDecodedToken(storedToken);
    if (user) {
      setClient(user);
    } else {
      setClient(null);
      console.error("Failed to decode token.");
    }
    setLoading(false);
  };

  // Run once on mount
  useEffect(() => {
    getUser();

    // Listen for token changes in other tabs/windows
    const onStorage = (e: StorageEvent) => {
      if (e.key === "token") {
        getUser();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <UserContext.Provider
      value={{
        phoneNumber: client?.phoneNumber,
        userId: client?.userId,
        role: client?.role,
        name: client?.name,
        createdAt: client?.createdAt,
        userEmail: client?.userEmail,
        getUser,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};
