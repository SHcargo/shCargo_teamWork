/* eslint-disable @next/next/no-img-element */

"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Product = {
  _id: string;
  title: string;
  price: number;
  description: string;
  image: string;
};

const BuySelectedProduct = ({ selectedId }: { selectedId: string }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const router = useRouter();

  const getSelectedProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sales/${selectedId}`
      );
      setSelectedProduct(response.data.data);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    if (selectedId) getSelectedProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  if (!selectedProduct) {
    return <p></p>;
  }

  return (
    <div className="w-screen h-screen flex flex-col bg-white items-center justify-start">
  
    <Header />
 
    <div className="w-screen h-screen flex flex-col bg-white items-center justify-center relative top-[70px]">
      <div onClick={() => router.push(`/`)}>
        
      </div>
      <div className="max-w-2xl w-full h-full bg-[#e9ecef]  px-6 py-4">
        <div className="flex gap-3">
          <div className="">
            <img
              src={selectedProduct.image}
              style={{ width: 700, height: 450 }}
              alt={selectedProduct.title}
              className="w-full h-64 object-cover rounded"
            />
          </div>
        </div>
        <div className="space-y-4 p-5">
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold mt-2">{selectedProduct.title}</h2>
            <p className="text-gray-700 text-2xl">${selectedProduct.price}</p>
          </div>
          <div>
            <p className="text-xl text-gray-500">Free size</p>
            <p className="text-sm text-gray-500 mt-1">
              {selectedProduct.description}
            </p>
          </div>
        </div>

        <Button className="w-full">Худалдан авах</Button>
      </div>
    </div>
    </div>
  );
};

export default BuySelectedProduct;
