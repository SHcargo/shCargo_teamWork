"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Deliveries = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("Бүгд");

  const categories = [
    "Бүгд",
    "Хятад дотор",
    "Замд",
    "УБ хотод",
    "Хүргэгдсэн",
  ];

  const deliveryCounts: Record<string, number> = {
    "Бүгд": 0,
    "Хятад дотор": 0,
    "Замд": 0,
    "УБ хотод": 0,
    "Хүргэгдсэн": 0,
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    // Optional: trigger filter logic here
    console.log("Selected category:", category);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full h-full bg-[#e9ecef] p-4 flex flex-col gap-2">
        <div className="flex gap-4">
          <button
            onClick={() => router.back()}
            className="bg-[#5F2DF5] h-11 w-11 flex items-center justify-center rounded-lg"
          >
            <ChevronLeft color="#fff" />
          </button>
          <div className="flex-1 flex flex-col items-center">
            <h2>Захиалгын түүх</h2>
            <p className="text-gray-500">{deliveryCounts[activeCategory]} ачаа</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeCategory === category
                  ? "bg-[#5F2DF5] text-white"
                  : "bg-white text-[#5F2DF5]"
              }`}
            >
              {category} ({deliveryCounts[category]})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Deliveries;
