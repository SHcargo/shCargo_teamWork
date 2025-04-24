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
    <div className="w-screen flex justify-center absolute bottom-0 h-[100px]">
      <div className="max-w-2xl w-full  bg-[#11043B] shadow-md flex justify-around items-center ">
        <button
          className={`text-sm inline-flex flex-col items-center `}
          onClick={() => setStep("home")}
        >
          <Home stroke={step === "home" ? "#5F2DF5" : "white"} />
          Home
        </button>
        <button
          className="text-sm inline-flex flex-col items-center"
          onClick={() => setStep("location")}
        >
          <LocationEdit stroke={step === "location" ? "#5F2DF5" : "white"} />
          Location
        </button>
        <button
          className="text-sm inline-flex flex-col items-center"
          onClick={() => setStep("cargo")}
        >
          <Truck stroke={step === "cargo" ? "#5F2DF5" : "white"} />
          Cargo
        </button>
        <button
          className="text-sm inline-flex flex-col items-center"
          onClick={() => {
            if (token) setStep("profile");
            if (!token) router.push("/logIn");
          }}
        >
          <User stroke={step === "logIn" ? "#5F2DF5" : "white"} />
          Sign In
        </button>
      </div>
    </div>
  );
};

export default NavBar;
