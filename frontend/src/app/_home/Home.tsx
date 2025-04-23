import {  Calculator, Lightbulb, LocationEdit, MapPinHouse, Paperclip, ShoppingCart, Truck } from "lucide-react";
import InfoCard from "../components/card2";
import { useRouter } from "next/navigation";

const HomePage = ({setStep} :{setStep : (value: string) => void} ) => {
  const router = useRouter()
  return (
    <div className="max-w-2xl w-full h-full bg-[#e9ecef] p-8 flex flex-col gap-2 items-center">
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
        onClick={() => router.push('/calculate')}
      />
      <InfoCard
        icon={Truck}
        title="Гэрт Хүргэх"
        subtitle="Таны гэрийн хаягт хүргэх"
        onClick={() => router.push('/deliveries')} 
      />
      <InfoCard
        icon={MapPinHouse}
        title="SH Cargo Салбар"
        subtitle="УБ дахь 2 салбар"
        onClick={() => router.push('/contact')}
      />
      <InfoCard
        icon={Lightbulb}
        title="Ашиглах Заавар"
        subtitle="Заавар, тайлбар"
        onClick={() => router.push('/guide')}
      />
      <InfoCard
        icon={Paperclip}
        title="Үйлчилгээ Нөхцөл"
        subtitle="HiCargo журам"
        onClick={() => router.push('/terms-conditions')}
      />
    </div>
  );
};

export default HomePage;
