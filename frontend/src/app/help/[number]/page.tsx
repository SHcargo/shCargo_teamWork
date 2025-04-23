"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const DetailedHelpAddress = () => {
  const router = useRouter();

  const handleWatchVideo = () => {
    window.open("https://www.youtube.com/watch?v=cNmbWXLUL4g", "_blank");
  };
  const handleTruckWatchVideo = () => {
    window.open("https://www.youtube.com/watch?v=KdVxIwXwiak", "_blank");
  };
  return (
    <div className="w-screen h-screen flex flex-col bg-[#dddddd] items-center justify-center">
      <div className="max-w-2xl w-full h-full bg-[#e9ecef] px-6 py-4 flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <Button className="bg-white p-2" onClick={() => router.back()}>
            <ChevronLeft className="text-black " />
          </Button>
        </div>
        <div className="flex flex-col space-y-3 items-center justify-center">
          <h1 className="text-xl font-bold">Хятад хаяг холбох</h1>
          <Button
            className="bg-[#5F2DF5] w-[590px] h-[60px]"
            onClick={handleWatchVideo}
          >
            Бичлэг үзэх
          </Button>
        </div>
        <div className="flex flex-col space-y-3 items-center justify-center">
          <h1 className="text-xl font-bold">Трак дугаараа бүртгүүлэх</h1>
          <Button
            className="bg-[#5F2DF5] w-[590px] h-[60px]"
            onClick={handleTruckWatchVideo}
          >
            Бичлэг үзэх
          </Button>
        </div>
      </div>
    </div>
  );
};
export default DetailedHelpAddress;
