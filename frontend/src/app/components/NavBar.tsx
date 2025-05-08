"use client";

import { Home, LocationEdit, Truck, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser } from "../providers/UserProvider";

const NavBar = ({
  setStep,
  step,
}: {
  setStep: (value: string) => void;
  step: string;
}) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const phoneNumber = useUser();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, [phoneNumber]);

  return (
    <div className="w-screen flex justify-center fixed bottom-0 h-[70px] z-50">
      <div className="max-w-2xl w-full bg-[#101010] shadow-md flex justify-around items-center">
        <button
          className="text-xs flex flex-col items-center cursor-pointer"
          onClick={() => setStep("home")}
        >
          <Home stroke={step === "home" ? "#7B61FF" : "#E0E0E0"} size={20} />
          <span
            className={`mt-1 ${
              step === "home" ? "text-[#7B61FF]" : "text-[#E0E0E0]"
            }`}
          >
            Home
          </span>
        </button>
        <button
          className="text-xs flex flex-col items-center cursor-pointer"
          onClick={() => setStep("location")}
        >
          <LocationEdit
            stroke={step === "location" ? "#7B61FF" : "#E0E0E0"}
            size={20}
          />
          <span
            className={`mt-1 ${
              step === "location" ? "text-[#7B61FF]" : "text-[#E0E0E0]"
            }`}
          >
            Help
          </span>
        </button>
        <button
          className="text-xs flex flex-col items-center cursor-pointer"
          onClick={() => setStep("cargo")}
        >
          <Truck stroke={step === "cargo" ? "#7B61FF" : "#E0E0E0"} size={20} />
          <span
            className={`mt-1 ${
              step === "cargo" ? "text-[#7B61FF]" : "text-[#E0E0E0]"
            }`}
          >
            Shop
          </span>
        </button>
        <button
          className="text-xs flex flex-col items-center cursor-pointer"
          onClick={() => {
            if (token) setStep("profile");
            else router.push("/LogIn");
          }}
        >
          {phoneNumber?.phoneNumber ? (
            <>
              <User
                stroke={step === "profile" ? "#5F2DF5" : "#E0E0E0"}
                size={20}
              />
              <span
                className={`mt-1 ${
                  step === "profile" ? "text-[#7B61FF]" : "text-[#E0E0E0]"
                }`}
              >
                {phoneNumber.phoneNumber}
              </span>
            </>
          ) : (
            <>
              <User stroke="#E0E0E0" size={20} />
              <span className="mt-1 text-[#E0E0E0]">Profile</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
