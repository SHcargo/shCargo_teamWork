"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

type SalesProduct = {
  _id: string;
  title: string;
  price: number;
  description: string;
  image: string;
};

type SalesProductsContextType = {
  products: SalesProduct[];
  fetchProducts: () => void;
};

const SalesProductsContext = createContext<
  SalesProductsContextType | undefined
>(undefined);

export const SalesProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<SalesProduct[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/sales`);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SalesProductsContext.Provider value={{ products, fetchProducts }}>
      {children}
    </SalesProductsContext.Provider>
  );
};

export const useSalesProducts = () => {
  const context = useContext(SalesProductsContext);
  if (!context) {
    throw new Error("useSalesProducts must be used within a SalesProvider");
  }
  return context;
};
