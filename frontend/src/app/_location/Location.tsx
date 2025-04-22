"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Location = () => {
  const number = 1;
  const router = useRouter();
  return (
    <div className="max-w-2xl w-full h-full bg-[#e9ecef]">
      <div className="p-4">
        <Button
          className="w-full h-12 bg-white text-black justify-between rounded-lg flex font-bold"
          onClick={() => router.push(`/address/${number}`)}
        >
          Эрээн агуулах
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default Location;
