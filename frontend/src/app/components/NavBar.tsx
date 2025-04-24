"use client";

import { Home, LocationEdit, Truck, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const NavBar = ({
  setStep,
  step,
}: {
  setStep: (value: string) => void;
  step: string;
}) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <div className="w-screen flex justify-center fixed bottom-0 h-[70px] z-50">
      <div className="max-w-2xl w-full bg-[#11043B] shadow-md flex justify-around items-center">
        <button
          className="text-xs flex flex-col items-center"
          onClick={() => setStep("home")}
        >
          <Home stroke={step === "home" ? "#5F2DF5" : "white"} size={20} />
          <span className="mt-1 text-[#5F2DF5]">Home</span>
        </button>
        <button
          className="text-xs flex flex-col items-center"
          onClick={() => setStep("location")}
        >
          <LocationEdit stroke={step === "location" ? "#5F2DF5" : "white"} size={20} />
          <span className="mt-1 text-[#5F2DF5]">Location</span>
        </button>
        <button
          className="text-xs flex flex-col items-center"
          onClick={() => setStep("cargo")}
        >
          <Truck stroke={step === "cargo" ? "#5F2DF5" : "white"} size={20} />
          <span className="mt-1 text-[#5F2DF5]">Cargo</span>
        </button>
        <button
          className="text-xs flex flex-col items-center"
          onClick={() => {
            if (token) setStep("profile");
            else router.push("/logIn");
          }}
        >
          <User stroke={step === "logIn" ? "#5F2DF5" : "white"} size={20} />
          <span className="mt-1 text-[#5F2DF5]">Sign In</span>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
