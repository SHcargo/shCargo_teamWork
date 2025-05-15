"use client";

import { useState } from "react";
import {
  BarChart3,
  Building2,
  HelpingHand,
  Star,
  Menu,
  X,
  Truck,
} from "lucide-react";
import Logo from "@/components/ui/logoSh";

const categories = [
  { name: "Хэрэглэгчид", step: "users", icon: Star },
  { name: "Sales", step: "sales", icon: BarChart3 },
  { name: "Хаяг Холбох", step: "location", icon: Building2 },
  // { name: "Тусламж", step: "help", icon: HelpingHand },
  { name: "Хүргэлт", step: "Delivery", icon: Truck },
];

export default function Sidebar({
  step,
  setStep,
}: {
  step: string;
  setStep: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded bg-white border shadow"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[250px] bg-white border-r border-[#E5E5E5] p-4 transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block`}
      >
        <Logo className="w-30 mb-8 h-30 bg-black rounded-2xl" />
        <nav>
          <ul className="space-y-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <li key={category.name}>
                  <button
                    onClick={() => {
                      setStep(category.step);
                      setIsOpen(false); // close sidebar on mobile
                    }}
                    className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left transition-colors ${
                      step === category.step
                        ? "bg-gray-200"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{category.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
