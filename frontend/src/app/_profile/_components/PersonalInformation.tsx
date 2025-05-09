import { useUser } from "@/app/providers/UserProvider";
import { User } from "lucide-react";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

const PersonalInformation = () => {
  const { name, phoneNumber } = useUser();
  const [splitedNumber, setSplitedNumber] = useState("");

  useEffect(() => {
    if (phoneNumber) {
      const splitedPhoneNumber = `${phoneNumber.slice(0, 4)}-****`;
      setSplitedNumber(splitedPhoneNumber);
    }
  }, [phoneNumber]);
  return (
    <div className="w-full h-auto cursor-default p-4 flex flex-col gap-4 bg-white rounded-lg">
      <h1 className="font-medium">Таний хувийн мэдээлэл</h1>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <User width={16} height={16} />
          <p className="font-medium text-[14px]">Таний нэр</p>
        </div>
        <h1 className="border-2 p-2 rounded-lg cursor-default">{name}</h1>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <Phone width={16} height={16} />
          <p className="font-medium text-[14px]">Таний утсаны дугаар</p>
        </div>
        <h1 className="border-2 p-2 rounded-lg cursor-default">
          {splitedNumber}
        </h1>
      </div>
    </div>
  );
};

export default PersonalInformation;
