"use client";

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import { useState } from "react";
import Location from "./_location/Location";
import Cargo from "./_cargo/Cargo";
import Auth from "./_sign/auth";
import Profile from "./_profile/Profile";
import Sales from "./_sales/_features/Sales";

export default function Home() {
  const [step, setStep] = useState("home");

  return (
    <div className="w-screen h-screen flex flex-col ">
      <Header setStep={setStep} />
      <div className="w-screen h-auto flex justify-center relative top-[70px]">
        {step === "home" && <Cargo />}
        {step === "location" && <Location setStep={setStep} />}
        {step === "cargo" && <Sales />}
        {step === "logIn" && <Auth />}
        {step === "profile" && <Profile />}
      </div>

      <NavBar setStep={setStep} step={step} />
    </div>
  );
}
