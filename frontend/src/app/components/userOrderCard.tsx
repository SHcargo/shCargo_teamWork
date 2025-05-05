"use client";
import { useRouter } from "next/navigation";

export const UserOrderCard = ({
  description,
  id,
  statusHistory,
  trackingNumber,
}: {
  description: string;
  trackingNumber: string;
  id: string;
  statusHistory: { status: string; changedAt: string }[];
}) => {
  const router = useRouter();

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm cursor-pointer mb-4">
      <div
        className="flex justify-between w-full "
        onClick={() => router.push(`/goodsForUsers/${id}`)}
      >
        <h2 className="text-lg font-semibold flex items-center">📦 Ачаа</h2>
        <div className="flex">
          <p className="text-sm text-gray-500 mt-1">{description}</p>
          <button className="text-gray-400 text-xl">›</button>
          <div>delete</div>
        </div>
      </div>
      <p>Ачааны дугаар: {trackingNumber}</p>
      <div className="flex gap-4">
        <button
          className="mt-3 h-16 px-2 py-2 bg-gray-400 text-white rounded-lg w-full cursor-pointer hover:bg-[#5F2DF590]"
          onClick={() => router.push("/contact")}
        >
          Салбараас авах
        </button>
        <button className="mt-3 h-16 px-2 py-2 bg-gray-400 text-white rounded-lg w-full cursor-pointer hover:bg-[#5F2DF590]">
          🚚 Хүргүүлэх
        </button>
      </div>
    </div>
  );
};
