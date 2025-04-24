import { LucideBoxes } from "lucide-react";
import { FileCheck, Truck, MapPin, FileX } from "lucide-react";

const Delivery = () => {
  return (
    <div className="w-full h-auto flex flex-col gap-6 bg-white rounded-lg p-4">
      <div className="flex gap-2">
        <LucideBoxes />
        <p className="font-medium">Карго</p>
      </div>
      <div className="flex items-center justify-center gap-3 w-full px-4">
        <div className="flex flex-col items-center p-2 border-2 border-gray-300 rounded-xl bg-gray-100 min-w-[80px]">
          <FileCheck className="w-4 h-4 mb-1" />
          <p className="font-semibold text-[12px]">Бүртгэсэн</p>
        </div>

        <div className="h-[1.5px] flex-1 bg-gray-300"></div>

        <div className="flex flex-col items-center p-2 border-2 border-gray-300 rounded-xl bg-gray-100 min-w-[80px]">
          <Truck className="w-4 h-4 mb-1" />
          <p className="font-semibold text-[12px]">Замдаа</p>
        </div>

        <div className="h-[1.5px] flex-1 bg-gray-300"></div>

        <div className="flex flex-col items-center p-2 border-2 border-gray-300 rounded-xl bg-gray-100 min-w-[80px]">
          <MapPin className="w-4 h-4 mb-1" />
          <p className="font-semibold text-[12px]">УБ-д ирсэн</p>
        </div>

        <div className="flex flex-col items-center p-2 border-2 border-gray-300 rounded-xl bg-gray-100 min-w-[80px] ml-2">
          <FileX className="w-4 h-4 mb-1" />
          <p className="font-semibold text-[12px]">Хаагдсан</p>
        </div>
      </div>
    </div>
  );
};
export default Delivery;
