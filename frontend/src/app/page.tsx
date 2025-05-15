"use client";

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Location from "./_location/Location";
import Cargo from "./_cargo/Cargo";
import Auth from "./_sign/auth";
import Profile from "./_profile/Profile";
import Sales from "./_sales/_features/Sales";
import useStepStore from "./components/step";

export default function Home() {
  const { step, setStep } = useStepStore();

  return (
    <div className="w-screen h-screen flex flex-col ">
      <Header />
      <div className="flex-1" style={{ height: "calc(100vh - 140px)" }}>
      <div className="w-screen flex justify-center relative top-[70px]" >
        {step === "home" && <Cargo />}
        {step === "location" && <Location setStep={setStep} />}
        {step === "cargo" && <Sales />}
        {step === "logIn" && <Auth />}
        {step === "profile" && <Profile />}
      </div>
      </div>

      <NavBar setStep={setStep} step={step} />
    </div>
  );
}
