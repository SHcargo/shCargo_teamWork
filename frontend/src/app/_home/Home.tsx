import {
  Calculator,
  Lightbulb,
  LocationEdit,
  MapPinHouse,
  Paperclip,
  Truck,
} from "lucide-react";
import InfoCard from "../components/card2";
import { useRouter } from "next/navigation";

const HomePage = ({ setStep }: { setStep: (value: string) => void }) => {
  const router = useRouter();
  return (
    <div className="max-w-2xl w-full bg-[#e9ecef] h-auto p-4 gap-4 overflow-scroll flex items-center flex-col">
      <div className="grid grid-cols-3 gap-6 w-full ">
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

      <div className="w-full h-[500px] bg-amber-300"></div>
    </div>
  );
};

export default HomePage;
