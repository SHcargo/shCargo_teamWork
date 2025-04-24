"use client";

import { useRouter } from "next/navigation";
import { Plus, LocationEdit } from "lucide-react";
const DeliveryAddress = () => {
  const router = useRouter();
  return (
    <div className="w-full h-auto p-4 gap-4 flex flex-col rounded-lg bg-white">
      <div className="flex gap-2 items-center">
        <LocationEdit width={16} height={16} />
        <h1 className="font-medium">Миний хаяг</h1>
      </div>
      <button
        className="flex justify-center items-center py-2 cursor-pointer px-4 bg-[#5F2DF5] w-full text-white gap-2 rounded-lg"
        onClick={() => router.push("/deliveryAddress")}
      >
        <Plus width={16} height={16} stroke="white" /> <p>Шинэ хаяг нэмэх</p>
      </button>
    </div>
  );
};

export default DeliveryAddress;
