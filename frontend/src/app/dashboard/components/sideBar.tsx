"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Building2,
  Cog,
  PenTool,
  Rocket,
  Terminal,
  Palette,
  Workflow,
  Star,
  Menu,
  X,
} from "lucide-react";

const categories = [
  { name: "Хэрэглэгчид", path: "/featured", icon: Star },
  { name: "Sales", path: "/sales", icon: BarChart3 },
  { name: "Хаяг Холбох ", path: "/back-office", icon: Building2 },
  { name: "Тээврийн Зардал", path: "/operations", icon: Cog },
  { name: "Үйлчилгээ Нөхцөл", path: "/growth-marketing", icon: Rocket },
  { name: "Writing & Editing", path: "/writing-editing", icon: PenTool },
  { name: "Technology & IT", path: "/technology-it", icon: Terminal },
  { name: "Design & Creative", path: "/design-creative", icon: Palette },
  { name: "Workflow Automation", path: "/workflow-automation", icon: Workflow },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
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
        <div className="mb-8">
          <Link href="/" className="block">
            <h1 className="text-xl font-bold text-black hover:text-gray-600 transition-colors">
              SH cargo Admin
            </h1>
          </Link>
        </div>

        <nav>
          <ul className="space-y-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <li key={category.name}>
                  <Link
                    href={category.path}
                    className="flex items-center gap-3 px-3 py-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)} // Close on click (mobile)
                  >
                    <Icon className="w-5 h-5" />
                    <span>{category.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
