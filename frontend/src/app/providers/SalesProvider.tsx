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
  title: string;
  price: number;
  description: string;
  image: string;
};

type SalesProductsContextType = {
  products: SalesProduct[];
};

const SalesProductsContext = createContext<
  SalesProductsContextType | undefined
>(undefined);

export const SalesProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<SalesProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/sales`
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <SalesProductsContext.Provider value={{ products }}>
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
