import { Calculator, Lightbulb, LocationEdit, MapPinHouse, Paperclip, Truck } from "lucide-react";
import InfoCard from "../components/card2";
import { useRouter } from "next/navigation";

const HomePage = ({ setStep }: { setStep: (value: string) => void }) => {
  const router = useRouter();
  return (
    <div className="w-full fit-full bg-[#e9ecef] p-4 sm:p-6 md:p-8 flex flex-wrap justify-center gap-6 items-center overflow-y-scroll">
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
      <div className="w-35 h-35 "></div>
    </div>
  );
};

export default HomePage;
