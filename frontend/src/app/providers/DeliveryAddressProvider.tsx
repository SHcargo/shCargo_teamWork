"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@/app/providers/UserProvider";

type DeliveryAddress = {
  _id: string;
  city: string;
  district: string;
  khoroo: string;
  detail: string;
  userId: string;
};

type DeliveryAddressContextType = {
  addresses: DeliveryAddress[];
  fetchAddresses: () => Promise<void>;
};

const DeliveryAddressContext = createContext<
  DeliveryAddressContextType | undefined
>(undefined);

export const DeliveryAddressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userId } = useUser();
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);

  const fetchAddresses = async () => {
    if (!userId) return;
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/deliveryAddress/${userId}`
      );
      setAddresses(response.data.data);
    } catch (error) {
      console.error("Failed to fetch delivery addresses", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [userId]);
  return (
    <DeliveryAddressContext.Provider value={{ addresses, fetchAddresses }}>
      {children}
    </DeliveryAddressContext.Provider>
  );
};

export const useDeliveryAddress = () => {
  const context = useContext(DeliveryAddressContext);
  if (!context)
    throw new Error(
      "useDeliveryAddress must be used within DeliveryAddressProvider"
    );
  return context;
};
