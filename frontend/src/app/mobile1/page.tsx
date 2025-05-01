"use client";
import { useState } from "react";
import QrGenerator from "./_qrGenerator/qrGenerator";
import ScanCode from "./_scan/scanCode";
import ImageGenerator from "./_imageGenerator/imageGenerator";

export const PhoneScanner = () => {
  const [step, setStep] = useState("qrGenerator");

  const handleNextStep = () => {
    if (step === "qrGenerator") {
      setStep("scan");
    } else if (step === "scan") {
      setStep("imageGenerator");
    } else if (step === "imageGenerator") {
      setStep("qrGenerator");
    }
  };

  return (
    <div>
      <main>
        {step === "qrGenerator" && <QrGenerator />}
        {step === "scan" && <ScanCode />}
        {step === "imageGenerator" && <ImageGenerator />}
      </main>
      <button className="text-xl w-20 h-20 ml-100" onClick={handleNextStep}>
        Next
      </button>
    </div>
  );
};

export default PhoneScanner;
