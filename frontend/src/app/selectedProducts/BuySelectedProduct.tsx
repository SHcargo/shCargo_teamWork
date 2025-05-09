/* eslint-disable @next/next/no-img-element */

"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import useStepStore from "../components/step";

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
  const { setStep } = useStepStore();

  useEffect(() => {
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

    if (selectedId) getSelectedProduct();
  }, [selectedId]);

  if (!selectedProduct) return <p className="mt-20">Loading...</p>;

  return (
    <div className="w-screen h-screen flex flex-col bg-white">
      <Header />

      {/* Full-height content area under header */}
      <main className="flex-1 pt-[70px] flex items-center justify-center  px-4 bg-[#f8f9fa]">
        <div className="relative max-w-2xl w-full h-[100%] cursor-pointer bg-white shadow-lg rounded-lg px-6 pt-[100px] overflow-y-auto">
          {/* Back Button */}
          <button
            onClick={() => {
              setStep("cargo");
              router.push("/");
            }}
            className="absolute top-4 cursor-pointer left-4 flex items-center gap-2 text-sm text-gray-700 hover:text-black transition"
          >
            <ArrowLeft size={18} />
            Буцах
          </button>

          {/* Product Image */}
          <img
            src={selectedProduct.image}
            alt={selectedProduct.title}
            className="w-full h-[350px] object-cover rounded-md mt-12"
          />

          {/* Product Info */}
          <div className="mt-6 space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{selectedProduct.title}</h2>
              <p className="text-xl font-semibold">${selectedProduct.price}</p>
            </div>
            <p className="text-gray-500 text-sm">Free size</p>
            <p className="text-gray-600 text-base leading-relaxed">
              {selectedProduct.description}
            </p>
          </div>

          {/* Buy Button */}
          <Button className="w-full mt-6 ">Худалдан авах</Button>
        </div>
      </main>
    </div>
  );
};

export default BuySelectedProduct;
