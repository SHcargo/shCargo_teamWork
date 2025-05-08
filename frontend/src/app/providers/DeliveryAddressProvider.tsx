"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { useUser } from "@/app/providers/UserProvider";

type DeliveryAddress = {
  accuracy: any;
  lng: number;
  lat: number;
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

  const fetchAddresses = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/deliveryAddress/${userId}`
      );

      const { data } = response.data;

      setAddresses(data);
    } catch (error) {
      console.error("Failed to fetch delivery addresses", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

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
