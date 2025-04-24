"use client";
import { useRouter } from "next/navigation";
import Post from "../components/post";
import { useState } from "react";
import { UserOrderCard } from "../components/userOrderCard";
import axios from "axios";

const Cargo = () => {
  const [activeCategory, setActiveCategory] = useState("Бүгд");
  const [loading, isLoading] = useState(false);

  const categories = ["Бүгд", "Бүртгэсэн", "Замдаа", "УБ-д ирсэн", "Хаагдсан"];
  const getCargoOrderItems = () => {
    isLoading(true);
    try {
      const res = axios.get("api");
    } catch (error) {
      console.log("Cargo data error", error);
    } finally {
      isLoading(false);
    }
  };

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
    <div className="flex flex-col h-screen w-full max-w-2xl mx-auto p-4 bg-white overflow-hidden">
      <div className="flex-shrink-0">
        <Post />
      </div>

      <div className="mt-4 flex gap-2 w-full overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={` min-h-12 px-8 rounded-lg text-xs transition-all ${
              activeCategory === category
                ? "bg-[#5F2DF5] text-white"
                : "bg-gray-100 text-[#5F2DF5]"
            }`}
          >
            {category} ({deliveryCounts[category] ?? 0})
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto mt-4 bg-gray-50 rounded-xl p-2 shadow-inner mb-4">
        {filteredOrders.map((order) => (
          <UserOrderCard
            key={order.id}
            count={order.count}
            description={order.description}
          />
        ))}
        <div className="h-10"></div>
      </div>
    </div>
  );
};

export default Cargo;
