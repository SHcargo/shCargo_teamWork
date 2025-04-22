"use client";
import { useState } from "react";
import SetpOne from "./components/setpOne";
import SetpTwo from "./components/setpTwo";
import SetpThird from "./components/setpThird";
import SetpFourth from "./components/setpFourth";
import SetpFifth from "./components/setpFifth";
import SetpSixth from "./components/setpSixth";

const titleOfDeliver = [
  { name: "Бүгд" },
  { name: "Бүртгэсэн" },
  { name: "Замдаа" },
  { name: "Ирсэн" },
  { name: "Хүргэлтэнд" },
  { name: "Хаагдсан" },
];

export const GoodsForUsers = () => {
  const [step, setStep] = useState("Бүгд");

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full h-full bg-[#e9ecef] p-4 flex flex-col gap-2 ">
        <div className="flex gap-4">
          <button className="bg-[#5F2DF5] text-white h-11 w-11 flex items-center justify-center rounded-lg">
            ›
          </button>
          <div className="flex-1 flex flex-col items-center">
            <h2>Хүргэлтүүд</h2>
            <p className="text-gray-500">{"0"} ачаа</p>
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          {titleOfDeliver.map((el, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-[#5F2DF5] text-white rounded-lg"
              onClick={() => setStep(el.name)}
            >
              {el.name}
            </button>
          ))}
        </div>
        {step === "Бүгд" && <SetpOne setStep={setStep} />}
        {step === "Бүртгэсэн" && <SetpTwo setStep={setStep} />}
        {step === "Замдаа" && <SetpThird setStep={setStep} />}
        {step === "Ирсэн" && <SetpFourth setStep={setStep} />}
        {step === "Хүргэлтэнд" && <SetpFifth setStep={setStep} />}
        {step === "Хаагдсан" && <SetpSixth setStep={setStep} />}
      </div>
    </div>
  );
};

export default GoodsForUsers;
