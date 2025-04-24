"use client";

import { useState } from "react";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { districts } from "../utils/address";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";

type DistrictKey = keyof typeof districts;

const AddAddressContent = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictKey | "">(
    ""
  );
  const [selectedKhoroo, setSelectedKhoroo] = useState<string | null>(null);

  const handleDistrictChange = (value: DistrictKey) => {
    setSelectedDistrict(value);
    setSelectedKhoroo(null);
  };

  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-2">
            <p>Шинэ хаяг бүртгэх</p>
            <p className="text-[14px] text-gray-400">
              Доорх мэдээллийг бөглөнө үү
            </p>
          </DialogTitle>
          <DialogDescription />
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[14px]">Хот / Аймаг</p>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Хот сонгох" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Улаанбаатар">Улаанбаатар</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[14px]">Сум / Дүүрэг</p>
              <Select onValueChange={handleDistrictChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Дүүрэг сонгох" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(districts).map((district) => (
                    <SelectItem value={district} key={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[14px]">Баг / Хороо</p>
              <Select
                value={selectedKhoroo ?? ""}
                onValueChange={setSelectedKhoroo}
                disabled={!selectedDistrict}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Хороо сонгох" />
                </SelectTrigger>
                <SelectContent>
                  {selectedDistrict &&
                    districts[selectedDistrict]?.map((khoroo, index) => (
                      <SelectItem value={khoroo} key={index}>
                        {khoroo}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[14px]">
                Дэлгэрэнгүй мэдээлэл(Хотхон, Баяр, Орц, Орцны код, Давхар, Тоот)
              </p>
              <Textarea
                placeholder="Дэлгэрэнгүй мэдээллээ оруулна уу"
                className=""
              />
            </div>
            <button className="bg-[#5F2DF5] flex px-1 py-2.5 items-center justify-center gap-2 rounded-lg">
              <Check width={16} height={16} stroke="white" />
              <p className="text-white font-semibold">Хадгалах</p>
            </button>
          </div>
        </DialogHeader>
      </DialogContent>
    </div>
  );
};

export default AddAddressContent;
