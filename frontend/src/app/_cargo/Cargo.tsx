"use client";

import { useRouter } from "next/navigation";
import Post from "../components/post";
import { useState, useEffect } from "react";
import { UserOrderCard } from "../components/userOrderCard";
import axios from "axios";

const Cargo = () => {
  const [activeCategory, setActiveCategory] = useState("Бүгд");

  const categories = ["Бүгд", "Бүртгэсэн", "Замдаа", "УБ-д ирсэн", "Хаагдсан"];

  const deliveryCounts: Record<string, number> = {
    Бүгд: 10,
    Бүртгэсэн: 1,
    Замдаа: 2,
    "УБ-д ирсэн": 4,
    Хаагдсан: 2,
  };

  const orders = [
    {
      id: 1,
      status: "Бүртгэсэн",
      description: "Захиалга амжилттай бүртгэгдсэн.",
      count: 1,
    },
    {
      id: 2,
      status: "Замдаа",
      description: "Бараа тээвэрлэгдэж байна.",
      count: 2,
    },
    {
      id: 3,
      status: "УБ-д ирсэн",
      description: "Бараа Улаанбаатарт хүргэгдсэн.",
      count: 4,
    },
    {
      id: 4,
      status: "Хаагдсан",
      description: "Захиалга амжилттай хаагдсан.",
      count: 2,
    },
  ];

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  const filteredOrders =
    activeCategory === "Бүгд"
      ? orders
      : orders.filter((order) => order.status === activeCategory);

  return (
    <div className="max-w-2xl w-full mx-auto p-4 bg-white shadow-md space-y-4 h-screen overflow-hidden">
      <Post />

      <div className="mt-4 flex flex-wrap gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-lg transition-all text-sm ${
              activeCategory === category
                ? "bg-[#5F2DF5] text-white"
                : "bg-gray-100 text-[#5F2DF5]"
            }`}
          >
            {category} ({deliveryCounts[category] ?? 0})
          </button>
        ))}
      </div>

      <div className="space-y-4 overflow-y-auto h-6/12 bg-gray-50 rounded-xl p-2 shadow-inner">
        {filteredOrders.map((order) => (
          <UserOrderCard
            key={order.id}
            count={order.count}
            description={order.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Cargo;
