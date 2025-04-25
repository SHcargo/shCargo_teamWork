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
  phoneNumber: string | undefined;
  role: string | undefined;
  userId: string | undefined;
  name: string | undefined;
  getUser: () => Promise<void>;
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
  // const [loading, setLoading] = useState(true);

  const getUser = async () => {
    const storedToken = localStorage.getItem("token");
    const user = await getDecodedToken(storedToken);
    setClient(user);
    // setLoading(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      getUser();
    }
  }, []);

  console.log("client", client);
  return (
    <UserContext.Provider
      value={{
        phoneNumber: client?.phoneNumber,
        userId: client?.userId,
        role: client?.role,
        name: client?.name,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    console.log("UserContext not available");
  }
  return context;
};
