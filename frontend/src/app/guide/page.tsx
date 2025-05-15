"use client";

import {
  Barcode,
  ChevronLeft,
  LocationEdit,
  Search,
  UserRound,
  Truck,
  Calculator,
} from "lucide-react";
import { useRouter } from "next/navigation";
import InfoCard from "../components/card2";

const Help = () => {
  const router = useRouter();

  const sections = [
    {
      title: "Tabao аппликейшнтэй холбоотой заавар хичээлүүд",
      items: [
        {
          icon: Barcode,
          title: "Трак дугаараа бүртгүүлэх",
          subtitle: "Таны барааг хүлээн авах дугаар",
          path: "/help/1",
        },
        {
          icon: Search,
          title: "Бараа хайх заавар",
          subtitle: "Taobao дээр бараа олох заавар",
          path: "/help/2",
        },
        {
          icon: LocationEdit,
          title: "Хятад хаяг холбоx",
          subtitle: "Бараа хүргэх хаяг тохируулах",
          path: "/help/3",
        },
        {
          icon: LocationEdit,
          title: "Taobao Монгол хаяг холбоx",
          subtitle: "Монгол хаяг нэмэх аргачлал",
          path: "/help/4",
        },
      ],
    },
    {
      title: "S.H CARGO аппликейшнтэй холбоотой заавар хичээлүүд",
      items: [
        {
          icon: Truck,
          title: "Хүргэлтэнд бүртгүүлэх",
          subtitle: "Барааг хаашаа хүргүүлэхээ сонгох",
          path: "/help/5",
        },
        {
          icon: Calculator,
          title: "Улаанбаатар хүргэлтийн үнэ",
          subtitle: "Үнэ тооцоолох гарын авлага",
          path: "/help/6",
        },
        {
          icon: UserRound,
          title: "Веб сайтaд бүртгүүлэх, нэвтрэх",
          subtitle: "Бүртгэл үүсгэх, нэвтрэх заавар",
          path: "/help/7",
        },
      ],
    },
    {
      title: "Pinduoduo",
      items: [
        {
          icon: LocationEdit,
          title: "Pinduoduo хаяг холбоx заавар",
          subtitle: "Pinduoduo хаяг тохируулах заавар",
          path: "/help/8",
        },
      ],
    },
  ];

  return (
    <div className="w-screen h-screen flex items-center justify-center ">
      <div className="max-w-2xl w-full h-full p-4 flex flex-col gap-4 bg-[#e9ecef] overflow-y-auto">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="bg-gray-300 h-11 w-11 flex items-center justify-center rounded-lg"
          >
            <ChevronLeft color="#000" />
          </button>
          <h1 className="text-xl font-bold text-center flex-1">Заавар</h1>
        </div>

        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">{section.title}</h2>
            <div className="grid grid-cols-2 space-y-4">
              {section.items.map((item, itemIndex) => (
                <InfoCard
                  key={itemIndex}
                  icon={item.icon}
                  title={item.title}
                  subtitle={item.subtitle}
                  onClick={() => router.push(item.path)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Help;
