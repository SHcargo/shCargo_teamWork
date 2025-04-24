"use client";
import { useRouter } from "next/navigation";

export const UserOrderCard = ({
  count,
  description,
}: {
  count: number;
  description: string;
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/goodsForUsers")}
      className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center">
          📦 Ачаа
          <span className="ml-2 text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-full">
            {count} ачаа
          </span>
        </h2>
        <button className="text-gray-400 text-xl">›</button>
      </div>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
      <p className="text-xl font-bold text-gray-800">{count} ачаа</p>
      <div className="flex">
        <button  className="mt-3 px-4 py-2 bg-gray-400 text-white rounded-lg w-full">Салбараас авах</button>
      <button className="mt-3 px-4 py-2 bg-gray-400 text-white rounded-lg w-full">
        🚚 Хүргүүлэх
      </button>
      </div>
    </div>
  );
};
