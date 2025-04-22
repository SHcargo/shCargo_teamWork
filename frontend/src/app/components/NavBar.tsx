"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const NavBar = ({ setStep }: { setStep: (value: string) => void }) => {
  return (
    <div className="w-screen flex justify-center absolute bottom-0 h-[100px]">
      <div className="max-w-sm w-full  bg-black shadow-md flex justify-around items-center ">
        <button className="text-sm " onClick={() => setStep("home")}>
          Home
        </button>
        <button className="text-sm" onClick={() => setStep("location")}>
          Location
        </button>
        <button className="text-sm" onClick={() => setStep("cargo")}>
          Cargo
        </button>
        <button className="text-sm" onClick={() => setStep("logIn")}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default NavBar;
