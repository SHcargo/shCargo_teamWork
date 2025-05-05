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
import { UserManualCard } from "../components/UserManualCard";

const Help = () => {
  const router = useRouter();

  const sections = [
    {
      title: "Taobao аппликейшнтэй холбоотой заавар хичээлүүд",
      items: [
        { icon: Barcode, title: "Трак дугаараа бүртгүүлэх", path: "/help/1" },
        { icon: Search, title: "Бараа хайх заавар", path: "/help/2" },
        { icon: LocationEdit, title: "Хятад хаяг холбоx", path: "/help/3" },
        {
          icon: LocationEdit,
          title: "Taobao Монгол хаяг холбоx",
          path: "/help/4",
        },
      ],
    },
    {
      title: "Hi cargo аппликейшнтэй холбоотой заавар хичээлүүд",
      items: [
        { icon: Truck, title: "Хүргэлтэнд бүртгүүлэх", path: "/help/5" },
        {
          icon: Calculator,
          title: "Улаанбаатар хүргэлтийн үнэ",
          path: "/help/6",
        },
        {
          icon: UserRound,
          title: "Веб сайтaд бүртгүүлэх, нэвтрэх",
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
          path: "/help/8",
        },
      ],
    },
  ];

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full h-full bg-[#e9ecef] p-4 flex flex-col gap-2">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => router.back()}
            className="bg-gray-300 h-11 w-11 flex items-center justify-center rounded-lg"
          >
            <ChevronLeft color="#000" />
          </button>
          <div className="flex-1 flex flex-col items-center">
            <h1 className="text-xl font-bold">Салбарын байршил</h1>
          </div>
        </div>

        {sections.map((section, index) => (
          <div key={index} className="inline-flex flex-col gap-4">
            <h1 className="font-bold">{section.title}</h1>
            {section.items.map((item, idx) => (
              <UserManualCard
                key={idx}
                icon={item.icon}
                title={item.title}
                onClick={() => router.push(item.path)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Help;
