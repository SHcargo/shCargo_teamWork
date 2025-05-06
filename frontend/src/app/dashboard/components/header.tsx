"use client";

import { Suspense } from "react";
export default function Header() {
  return (
    <header className="h-16 border-b border-[#E5E5E5] bg-white fixed top-0 right-0 z-10 w-full md:left-[250px]">
      <div className="h-full flex items-center justify-between px-4 sm:px-6">
        <Suspense
          fallback={
            <div className="w-full max-w-xl h-10 bg-gray-100 animate-pulse rounded-lg"></div>
          }
        ></Suspense>
      </div>
    </header>
  );
}
