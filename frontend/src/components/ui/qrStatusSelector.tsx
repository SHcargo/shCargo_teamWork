"use client";
import { useEffect } from "react";

type QrStatusSelectorProps = {
  activeStatus: string;
  setActiveStatus: (status: string) => void;
};

const categories: string[] = ["Замдаа", "УБ-д ирсэн", "Хаагдсан"];

export const QrStatusSelector = ({
  activeStatus,
  setActiveStatus,
}: QrStatusSelectorProps) => {
  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedStatus = localStorage.getItem("activeStatus");
      if (storedStatus && categories.includes(storedStatus)) {
        setActiveStatus(storedStatus);
      }
    }
  }, [setActiveStatus]);

  // Save to localStorage whenever activeStatus changes
  useEffect(() => {
    if (typeof window !== "undefined") {
    localStorage.setItem("activeStatus", activeStatus);
    }
  }, [activeStatus]);

  return (
    <div className="flex gap-2">
      {categories.map((status) => (
        <button
          key={status}
          onClick={() => setActiveStatus(status)}
          className={`min-h-12 px-8 rounded-lg text-xs transition-all cursor-pointer ${
            activeStatus === status
              ? "bg-[#5F2DF5] text-white"
              : "bg-gray-100 text-[#5F2DF5]"
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
};
