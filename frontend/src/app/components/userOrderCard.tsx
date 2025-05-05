"use client";

import axios from "axios";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

type UserOrderCardProps = {
  description: string;
  trackingNumber: string;
  id: string;
  activeCategory: string;
  statusHistory: { status: string; changedAt: string }[];
  ref:()=> void
};

export const UserOrderCard = ({
  description,
  id,
  trackingNumber,
  activeCategory,
  ref 
}: UserOrderCardProps) => {
  const router = useRouter();

  const showTrash =
    ["Бүртгэсэн", "Хаагдсан"].includes(activeCategory) ||
    ["Бүртгэсэн", "Хаагдсан"].includes(description);

  const DeleteTruckingByTrackingNumber = async (trackingNumber: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/truckItems/${trackingNumber}`
      );
      ref()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm cursor-pointer mb-4">
      <div
        className="flex justify-between w-full px-1.5"
        
      >
        <h2 className="text-lg font-semibold flex">📦 Ачаа</h2>
        <div>
          <p className="text-sm text-gray-500 flex items-center" onClick={() => router.push(`/goodsForUsers/${id}`)}>
            Order Status : {description}
            <span className="text-gray-400 text-xl ml-2">›</span>
          </p>
          {showTrash && (
            <div className="flex justify-end mt-2">
              <Trash2
                stroke="red"
                className="p-[4px] h-8 w-8 border rounded-full bg-gray-200"
                onClick={() => DeleteTruckingByTrackingNumber(trackingNumber)}
              />
            </div>
          )}
        </div>
      </div>

      <p>Ачааны дугаар: {trackingNumber}</p>

      <div className="flex gap-4">
        <button
          className="mt-3 h-10 px-2 py-2 bg-gray-200 text-black rounded-lg w-full cursor-pointer hover:bg-gray-500"
          onClick={() => router.push("/contact")}
        >
          Салбараас авах
        </button>
        <button className="mt-3 h-10 px-2 py-2 bg-gray-200 text-black rounded-lg w-full cursor-pointer hover:bg-gray-500">
          🚚 Хүргүүлэх
        </button>
      </div>
    </div>
  );
};
