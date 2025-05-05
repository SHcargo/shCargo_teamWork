"use client";
import {
  Calculator,
  Lightbulb,
  LocationEdit,
  MapPinHouse,
  Paperclip,
  Truck,
} from "lucide-react";
import InfoCard from "../components/card2";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Location = ({ setStep }: { setStep: (value: string) => void }) => {
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
      <div className="grid grid-cols-3 gap-6 w-full p-4">
        <InfoCard
          icon={LocationEdit}
          title="Хаяг Холбох"
          subtitle="Хятад дахь 5 салбар"
          onClick={() => setStep("location")}
        />
        <InfoCard
          icon={Calculator}
          title="Тээврийн Зардал"
          subtitle="Тооцоолуур"
          onClick={() => router.push("/calculate")}
        />
        <InfoCard
          icon={Truck}
          title="Миний захиалга"
          subtitle=""
          onClick={() => setStep("cargo")}
        />
        <InfoCard
          icon={MapPinHouse}
          title="SH Cargo Салбар"
          subtitle="УБ дахь 2 салбар"
          onClick={() => router.push("/contact")}
        />
        <InfoCard
          icon={Lightbulb}
          title="Ашиглах Заавар"
          subtitle="Заавар, тайлбар"
          onClick={() => router.push("/guide")}
        />
        <InfoCard
          icon={Paperclip}
          title="Үйлчилгээ Нөхцөл"
          subtitle="SH Cargo журам"
          onClick={() => router.push("/terms-conditions")}
        />
      </div>
    </div>
  );
};

export default Location;
