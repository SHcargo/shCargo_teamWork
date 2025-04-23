"use client";
import { useRouter } from "next/navigation";
import Post from "../components/post";
import { useState } from "react";
import { UserOrderCard } from "../components/userOrderCard";

const Cargo = () => {
  const [activeCategory, setActiveCategory] = useState("Бүгд");
  const categories = ["Бүгд", "Хятад дотор", "Замд", "УБ хотод", "Хүргэгдсэн"];

  const deliveryCounts: Record<string, number> = {
    Бүгд: 10,
    "Хятад дотор": 3,
    Замд: 2,
    "УБ хотод": 4,
    Хүргэгдсэн: 1,
  };

  const orders = [
    { id: 1, status: "Хятад дотор", description: "Эрээнд байна", count: 1 },
    { id: 2, status: "Замд", description: "Замд гарсан", count: 2 },
    { id: 3, status: "УБ хотод", description: "Улаанбаатарт ирсэн", count: 4 },
    { id: 4, status: "Хүргэгдсэн", description: "Хүргэгдсэн", count: 1 },
    { id: 5, status: "Хятад дотор", description: "Боомт дээр", count: 2 },
  ];

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  const filteredOrders =
    activeCategory === "Бүгд"
      ? orders
      : orders.filter((order) => order.status === activeCategory);

  return (
    <div className="max-w-2xl w-full mx-auto p-4 bg-white rounded-2xl shadow-md space-y-4 h-screen overflow-hidden">
      <Post />

      <div className="mt-4 flex flex-wrap gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeCategory === category
                ? "bg-[#5F2DF5] text-white"
                : "bg-gray-100 text-[#5F2DF5]"
            }`}
          >
            {category} ({deliveryCounts[category]})
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

      <div className="bg-red-100 p-4 rounded-xl flex items-center justify-between">
        <span className="text-red-600 font-semibold text-lg">
          📍 Хүргэлтүүд
        </span>
        <button className="text-gray-400 text-xl">›</button>
      </div>
    </div>
  );
};

export default Cargo;
