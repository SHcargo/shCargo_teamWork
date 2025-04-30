"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Location = () => {
  const number = 1;
  const router = useRouter();
  return (
    <div className="max-w-2xl w-full h-full overflow-scroll bg-[#e9ecef]">
      <div className="p-4">
        <Button
          className="w-full h-12 bg-white text-black justify-between rounded-lg flex font-bold"
          onClick={() => router.push(`/address/${number}`)}
        >
          Эрээн агуулах
          <ChevronRight />
        </Button>
      </div>
      <div className="p-4 space-y-3">
        <p className="font-bold">Тусламж</p>
        <Button
          className="w-full h-fit bg-white text-black rounded-lg flex items-center font-bold px-4 py-3 text-left"
          onClick={() => router.push(`/help/${number}`)}
        >
          <div className="flex w-full items-center justify-between flex-wrap">
            <p className="text-base break-words whitespace-normal">
              Хятад хаяг холбох болон Трак бүртгүүлэх заавар бичлэг үзэх
            </p>
            <ChevronRight className="flex-shrink-0 ml-2" />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Location;
