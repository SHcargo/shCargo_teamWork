"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  phoneNumber: string;
  role: string;
  userId: string;
  name: string;
  createdAt: Date;
};

type AdminContextType = {
  phoneNumber?: string;
  role?: string;
  userId?: string;
  name?: string;
  createdAt?: Date;
  getAdmin: () => Promise<void>;
  loading: boolean;
};

const AdminContext = createContext<AdminContextType>({} as AdminContextType);

const getDecodedToken = async (token: string | null) => {
  if (!token) return null;
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [adminClient, setAdminClient] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);

  const getAdmin = async () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setLoading(false);
      return;
    }

    const decoded = await getDecodedToken(storedToken);

    if (decoded && decoded.role === "ADMIN") {
      setAdminClient(decoded);
    } else {
      console.warn("User is not an admin or failed to decode token.");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      getAdmin();
    }
  }, []);

  return (
    <AdminContext.Provider
      value={{
        phoneNumber: adminClient?.phoneNumber,
        userId: adminClient?.userId,
        role: adminClient?.role,
        name: adminClient?.name,
        createdAt: adminClient?.createdAt,
        getAdmin,
        loading,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook to use the admin context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    console.warn("AdminContext not available");
  }
  return context;
};

export default AdminProvider;
