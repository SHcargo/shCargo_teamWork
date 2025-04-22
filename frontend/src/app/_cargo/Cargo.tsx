"use client";
import { useRouter } from "next/navigation";
import Post from "../components/post";

const Cargo = () => {
  const router = useRouter();
  return (
    <div className="max-w-2xl w-full mx-auto p-4 bg-white rounded-2xl shadow-md space-y-4">
      <Post />
      {/* Жижиг ачаа section */}
      <div
        onClick={() => router.push("/goodsForUsers")}
        className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center">
            📦 ачаа
            <span className="ml-2 text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-full">
              0 ачаа
            </span>
          </h2>
          <button className="text-gray-400 text-xl">›</button>
        </div>
        <p className="text-sm text-gray-500 mt-1">Улаанбаатарт ирсэн</p>
        <p className="text-xl font-bold text-gray-800">0 ачаа</p>
        <button className="mt-3 px-4 py-2 bg-gray-400 text-white rounded-lg w-full">
          🚚 Хүргүүлэх
        </button>
      </div>

      {/* Хүргэлтүүд section */}
      <div className="bg-red-100 p-4 rounded-xl flex items-center justify-between">
        <span className="text-red-600 font-semibold text-lg">
          📍 Хүргэлтүүд
        </span>
        <button className="text-gray-400 text-xl">›</button>
      </div>
    </div>
  );
};

export default Cargo;
