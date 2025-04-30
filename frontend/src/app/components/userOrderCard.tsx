"use client";
import { useRouter } from "next/navigation";

export const UserOrderCard = ({
  description,
  id,
  statusHistory,
  trackingNumber,
}: {
  description: string;
  trackingNumber:string;
  id: string;
  statusHistory: { status: string; changedAt: string }[];
}) => {
  const router = useRouter();

  return (
    <div
     
      className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm cursor-pointer mb-4"
    >
      <div className="flex items-center justify-between"  onClick={() => router.push(`/goodsForUsers/${id}`)}>
        <h2 className="text-lg font-semibold flex items-center">
          📦 Ачаа
          <span className="ml-2 text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-full">
            {/* Since count is no longer part of the data, you can display status instead */}
            {statusHistory.length} status updates
          </span>
        </h2>
        <button className="text-gray-400 text-xl">›</button>
      </div>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
      {/* Display the status history length */}
      <p className="text-xl font-bold text-gray-800">
        {statusHistory.length} updates
      </p>
      <p>track Number {trackingNumber}</p>
      <div className="flex gap-4">
        <button className="mt-3 h-16 px-2 py-2 bg-gray-400 text-white rounded-lg w-full cursor-pointer hover:bg-[#5F2DF590]" onClick={() => router.push('/contact')}>
          Салбараас авах
        </button>
        <button className="mt-3 h-16 px-2 py-2 bg-gray-400 text-white rounded-lg w-full cursor-pointer hover:bg-[#5F2DF590]">
          🚚 Хүргүүлэх
        </button>
      </div>
    </div>
  );
};
