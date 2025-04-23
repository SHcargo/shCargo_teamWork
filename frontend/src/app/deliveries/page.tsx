"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const deliveries = () => {
  const router = useRouter();
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full h-full bg-[#e9ecef] p-4 flex flex-col gap-2 ">
        <div className="flex gap-4">
          <button
            onClick={() => router.back()}
            className="bg-[#5F2DF5] h-11 w-11 flex items-center justify-center rounded-lg"
          >
            <ChevronLeft color="#fff" />
          </button>
          <div className="flex-1 flex flex-col items-center">
            <h2>Хүргэлтүүд</h2>
            <p className="text-gray-500">{"0"} ачаа</p>
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <button className="px-4 py-2 bg-[#5F2DF5] text-white rounded-lg">
            Бүгд
          </button>
          <button className="px-4 py-2 bg-white text-[#5F2DF5] rounded-lg">
            Хүргэлтэнд бүртгэсэн
          </button>
          <button className="px-4 py-2 bg-white text-[#5F2DF5] rounded-lg">
            Бүгд
          </button>
          <button className="px-4 py-2 bg-white text-[#5F2DF5] rounded-lg">
            Бүгд
          </button>
          <button className="px-4 py-2 bg-white text-[#5F2DF5] rounded-lg">
            Бүгд
          </button>
        </div>
      </div>
    </div>
  );
};
export default deliveries;
