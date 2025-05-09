"use client";

import { jwtDecode } from "jwt-decode";
import { useState, useEffect, createContext, useContext } from "react";

type DecodedToken = {
  phoneNumber: string;
  role: string;
  userId: string;
  name: string;
  createdAt: Date;
};

type UserContextType = {
  phoneNumber?: string;
  role?: string;
  userId?: string;
  name?: string;
  getUser: () => Promise<void>;
  loading: boolean;
  createdAt?: Date;
};

const getDecodedToken = async (token: string | null) => {
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
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setLoading(false); // If no token, we set loading to false and return
      return;
    }

    const user = await getDecodedToken(storedToken);
    if (user) {
      setClient(user);
    } else {
      console.error("Failed to decode token.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      getUser();
    }
  }, []);

  console.log(client);

  return (
    <UserContext.Provider
      value={{
        phoneNumber: client?.phoneNumber,
        userId: client?.userId,
        role: client?.role,
        name: client?.name,
        createdAt: client?.createdAt,
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
    console.warn("UserContext not available");
  }
  return context;
};
