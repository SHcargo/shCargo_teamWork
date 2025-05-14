"use client";
import { Lightbulb } from "lucide-react";
import InfoCard from "../components/card2";

import { useRouter } from "next/navigation";

const Location = ({}: { setStep: (value: string) => void }) => {
  const number = 1;
  const router = useRouter();
  return (
    <div className="max-w-2xl w-full h-screen overflow-scroll bg-[#e9ecef]">
      <div>
        <p className="font-bold p-4 text-2xl">Агуулах холбох</p>

        <div className="grid grid-cols-2 gap-6 w-full p-4">
          <InfoCard
            icon={Lightbulb}
            title="Эрээн агуулах"
            subtitle="Жижиг том бүх бараа хүлээж авна"
            onClick={() => router.push(`/address/${number}`)}
          />

          <InfoCard
            icon={Lightbulb}
            title="Хэбэй муж Шижяжуан хотын агуулах"
            subtitle="Жижиг том бүх бараа хүлээж авна"
            onClick={() => router.push(`/address/${number}`)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 w-full p-4">
        <InfoCard
          icon={Lightbulb}
          title="Гуанжоу агуулах"
          subtitle="Зөвхөн том 1м3-с дээш бараа хүлээж авна"
          onClick={() => router.push(`/address/${number}`)}
        />

        <InfoCard
          icon={Lightbulb}
          title="Шандун муж Линьи хот агуулах"
          subtitle="Зөвхөн том 1м3-с дээш бараа хүлээж авна"
          onClick={() => router.push(`/address/${number}`)}
        />
      </div>

      <div>
        <p className="font-bold p-4 text-2xl">Тусламж</p>
        <div className="grid grid-cols-2 gap-6 w-full p-4">
          <InfoCard
            icon={Lightbulb}
            title="Ашиглах Заавар"
            subtitle="Заавар, тайлбар"
            onClick={() => router.push("/guide")}
          />

          <InfoCard
            icon={Lightbulb}
            title="Үйлчилгээ Нөхцөл"
            subtitle="SH Cargo журам"
            onClick={() => router.push("/terms-conditions")}
          />
        </div>
      </div>
    </div>
  );
};

export default Location;
