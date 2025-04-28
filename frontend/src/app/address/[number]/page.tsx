"use client";

import { useUser } from "@/app/providers/UserProvider";
import { Button } from "@/components/ui/button";

import {
  ChevronLeft,
  ClipboardCopy,
  Globe,
  Phone,
  MapPin,
  Tag,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DeliveryAddress = () => {
  const router = useRouter();
  const { phoneNumber, getUser } = useUser();
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneNumber]);

  console.log(phoneNumber);

  return (
    <div className="w-screen h-screen flex flex-col bg-[#dddddd] items-center justify-center">
      <div className="max-w-2xl w-full h-full bg-[#e9ecef] px-6 py-4 flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <Button className="bg-white p-2" onClick={() => router.back()}>
            <ChevronLeft className="text-black" />
          </Button>
          <h1 className="text-xl font-bold">Эрээн</h1>
        </div>

        <div className="flex justify-between border bg-white p-4 rounded-sm text-center">
          <div>
            <p className="text-sm">1кг ачаа</p>
            <p className="font-semibold">3000 ₮</p>
          </div>
          <div>
            <p className="text-sm">1м3-с доош</p>
            <p className="font-semibold">599 ¥ </p>
          </div>
          <div>
            <p className="text-sm">1м3-с дээш</p>
            <p className="font-semibold">399 ¥</p>
          </div>
        </div>

        <div className="space-y-4">
          <CopyField
            label="收件人 (Хүлээн авагч)"
            text={
              `烸嵪 UWPTHA (${phoneNumber})` || "烸嵪 (Өөрийн утасны дугаар)"
            }
            Icon={User}
          />
          <CopyField label="电话 (Утас)" text={"15847901990"} Icon={Phone} />
          <CopyField
            label="所在地区 (Бүс нутаг)"
            text={"内蒙古自治区 锡林郭勒盟 二连浩特市社区建设管理局"}
            Icon={Globe}
          />
          <CopyField
            label="街道地址 (Хаяг)"
            text={
              `浩特汇通物流园区C05号 UWPTHA (${phoneNumber})` ||
              "浩特汇通物流园区C05号 (Өөрийн утасны дугаар)"
            }
            Icon={MapPin}
          />
          <CopyField label="邮编 (Зип код)" text={"011100"} Icon={Tag} />
        </div>
      </div>
    </div>
  );
};

const CopyField = ({
  label,
  text,
  Icon,
}: {
  label: string;
  text: string;
  Icon: React.ElementType;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <p className="text-sm mb-1 flex items-center gap-2">
        <Icon className="w-4 h-4" />
        {label}
      </p>
      <div className="border bg-white rounded-sm p-3 flex items-center justify-between">
        <span className="text-sm">{text}</span>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 text-blue-600 text-xs"
        >
          <ClipboardCopy className="w-4 h-4" />
          <span>{copied ? "Хуулсан" : "Хуулах"}</span>
        </button>
      </div>
    </div>
  );
};
export default DeliveryAddress;
