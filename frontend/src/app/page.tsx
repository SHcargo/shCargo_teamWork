"use client";

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import { useState } from "react";
import HomePage from "./_home/Home";
import Location from "./_location/Location";
import Cargo from "./_cargo/Cargo";
import Auth from "./_sign/auth";
import Profile from "./_profile/Profile";

export default function Home() {
  const [step, setStep] = useState("home");

  return (
    <div className="w-screen h-screen flex flex-col  bg-[rgb(221,221,221)]">
      <Header />
      <div className="w-screen h-full flex justify-center">
        {step === "home" && <HomePage setStep={setStep} />}
        {step === "location" && <Location />}
        {step === "cargo" && <Cargo />}
        {step === "logIn" && <Auth />}
        {step === "profile" && <Profile />}
      </div>

      <NavBar setStep={setStep} step={step} />
    </div>
  );
}
