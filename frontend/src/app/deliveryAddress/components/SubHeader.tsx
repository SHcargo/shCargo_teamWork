"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const SubHeader = () => {
  const router = useRouter();
  return (
    <div className="max-w-2xl w-full h-[80px] text-white px-6 bg-[#11043B] relative shadow-md flex justify-center items-center">
      <button
        className="bg-[#5F2DF5] left-6 rounded-sm p-1 absolute cursor-pointer"
        onClick={() => router.push("/")}
      >
        <ChevronLeft width={18} height={18} />
      </button>
      <h1 className="font-semibold text-xl">Миний хаягууд</h1>
    </div>
  );
};

export default SubHeader;
