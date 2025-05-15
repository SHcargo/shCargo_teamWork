/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";

type QrStatusSelectorProps = {
  activeStatus: string;
  setActiveStatus: (status: string) => void;
  categories?: string[];
};

const defaultCategories = ["Замдаа", "УБ-д ирсэн", "Хаагдсан"];

export const QrStatusSelector = ({
  activeStatus,
  setActiveStatus,
  categories,
}: QrStatusSelectorProps) => {
  const statusList = categories ?? defaultCategories;

  useEffect(() => {
    const storedStatus = localStorage.getItem("qrSelector_activeStatus");
    if (storedStatus && statusList.includes(storedStatus)) {
      setActiveStatus(storedStatus);
    }
  }, [setActiveStatus]);

  useEffect(() => {
    localStorage.setItem("qrSelector_activeStatus", activeStatus);
  }, [activeStatus]);

  return (
    <div className="flex gap-2 justify-center mb-4">
      {statusList.map((status) => (
        <button
          key={status}
          onClick={() => setActiveStatus(status)}
          aria-pressed={activeStatus === status}
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
