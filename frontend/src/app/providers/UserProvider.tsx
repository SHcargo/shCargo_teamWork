"use client";

import { jwtDecode } from "jwt-decode";
import { useState, useEffect, createContext, useContext } from "react";

type DecodedToken = {
  phoneNumber: string;
  role: string;
  userId: string;
  name: string;
};

type UserContextType = {
  phoneNumber?: string;
  role?: string;
  userId?: string;
  name?: string;
  getUser: () => Promise<void>;
  loading: boolean;
};

// Decode token safely
const getDecodedToken = async (token: string | null) => {
  if (!token) return null;

  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("❌ Invalid token:", error);
    return null;
  }
};

// Create context
const UserContext = createContext<UserContextType>({} as UserContextType);

// Provider component
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [client, setClient] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    const storedToken = localStorage.getItem("token");
    const user = await getDecodedToken(storedToken);
    setClient(user);
    setLoading(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      getUser();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        phoneNumber: client?.phoneNumber,
        userId: client?.userId,
        role: client?.role,
        name: client?.name,
        getUser,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    console.warn("UserContext not available");
  }
  return context;
};
