"use client";
import { useState, useEffect } from "react";

const categories: string[] = ["Замдаа", "УБ-д ирсэн", "Хаагдсан"];

export const QrStatusSelector = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Замдаа");

  // Load from localStorage on first render
  useEffect(() => {
    const storedCategory = localStorage.getItem("activeCategory");
    if (storedCategory && categories.includes(storedCategory)) {
      setActiveCategory(storedCategory);
    }
  }, []);

  // Save to localStorage whenever activeCategory changes
  useEffect(() => {
    localStorage.setItem("activeCategory", activeCategory);
  }, [activeCategory]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="flex gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`min-h-12 px-8 rounded-lg text-xs transition-all cursor-pointer ${
            activeCategory === category
              ? "bg-[#5F2DF5] text-white"
              : "bg-gray-100 text-[#5F2DF5]"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
