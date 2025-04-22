"use client";

import { Home, LocationEdit, Truck, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NavBar = ({ setStep , step}: { setStep: (value: string) => void , step: string}) => {
  return (
    <div className="w-screen flex justify-center absolute bottom-0 h-[100px]">
      <div className="max-w-sm w-full  bg-black shadow-md flex justify-around items-center ">
        <button className={`text-sm inline-flex flex-col items-center `} onClick={() => setStep("home")}>
          <Home stroke={step === "home" ? "red" : "white"}/>
          Home
        </button>
        <button className="text-sm inline-flex flex-col items-center" onClick={() => setStep("location")}>
          <LocationEdit stroke={step === "location" ? "red" : "white"}/>
          Location
        </button>
        <button className="text-sm inline-flex flex-col items-center" onClick={() => setStep("cargo")}>
          <Truck stroke={step === "cargo" ? "red" : "white"}/>
          Cargo
        </button>
        <button className="text-sm inline-flex flex-col items-center" onClick={() => setStep("logIn")}>
          <User stroke={step === "logIn" ? "red" : "white"}/>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default NavBar;
