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
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
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

      <main className="flex-1 pt-[70px] flex items-center justify-center px-4 bg-[#f8f9fa]">
        <div className="relative max-w-2xl w-full h-full cursor-pointer bg-white shadow-lg rounded-lg px-6 pt-[50px] overflow-y-auto">
          <button
            onClick={() => {
              setStep("cargo");
              router.push("/");
            }}
            className="absolute top-4 left-4 flex items-center gap-2 text-sm text-gray-700 hover:text-black transition"
          >
            <ArrowLeft size={18} />
            Буцах
          </button>

          <img
            src={selectedProduct.image}
            alt={selectedProduct.title}
            className="w-full h-[350px] object-cover rounded-md mt-2"
          />

          <div className="mt-6 space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{selectedProduct.title}</h2>
              <p className="text-xl font-semibold">${selectedProduct.price}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Free size</p>
            </div>
            <p className="text-gray-600 text-base leading-relaxed">
              PRODUCT CODE: {selectedProduct.description}
            </p>
          </div>

          {!showPaymentInfo && (
            <Button
              className="w-full mt-6"
              onClick={() => setShowPaymentInfo(true)}
            >
              Худалдан авах
            </Button>
          )}

          {showPaymentInfo && (
            <div className="mt-8 space-y-4 border-t pt-6">
              <p className="text-lg font-semibold text-center">
                Төлбөрийн мэдээлэл
              </p>

              <div className="flex justify-center">
                <img
                  src="/qr.png"
                  alt="QR Code"
                  className="w-48 h-48 object-contain"
                />
              </div>

              <div className="space-y-2 text-center text-sm text-gray-700">
                <p>💳 Банк: Хаан банк</p>
                <p>
                  📌 Дансны дугаар: <strong>5012345678</strong>
                </p>
                <p>
                  👤 Дансны нэр: <strong>Содбилэг Бат-Эрдэнэ</strong>
                </p>
                <p>
                  💬 Гүйлгээний утга:{" "}
                  <strong>{selectedProduct.description}</strong>
                </p>
              </div>
            </div>
          )}

          <div className="space-y-4 mt-10 text-sm text-gray-800">
            <div className="flex gap-4">
              <p className="font-bold">📍 Хаяг:</p>
              <p>
                СБД цирк-н баруун талд миний дэлгүүрийн чанх хойно 10-р байр
              </p>
            </div>
            <div className="flex gap-4">
              <p className="font-bold">📞 Холбогдох утас:</p>
              <p>95677999</p>
            </div>
            <div className="flex gap-4">
              <p className="font-bold">📘 Facebook хаяг:</p>
              <p>S.H CARGO</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BuySelectedProduct;
