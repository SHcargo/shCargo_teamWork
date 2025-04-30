"use client";
import React, { useState } from "react";

const ShippingCalculator = () => {
  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [calculateBy, setCalculateBy] = useState<"weight" | "volume">("weight");
  const [result, setResult] = useState<number | null>(null);

  const calculateCost = () => {
    const volume = (length * width * height) / 1000000;
    const volumeWeight = volume * 167;
    const effectiveWeight = Math.max(weight, volumeWeight);

    let cost = 0;

    if (calculateBy === "weight") {
      cost = Math.max(effectiveWeight, 1) * 3000;
    } else {
      cost = volume <= 1 ? 599 : 399 * volume;
    }

    setResult(cost);
  };

  const renderInputField = (
    label: string,
    value: number,
    setter: React.Dispatch<React.SetStateAction<number>>,
    hidden: boolean
  ) => (
    !hidden && (
      <div>
        <label className="block mb-1">{label}</label>
        <input
          type="number"
          value={value}
          onChange={(e) => setter(Number(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
    )
  );

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Тооцролуур</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Эрзен агуулах</h2>
        <p>Хэбэй муж Шижяжуан хотын агуулах</p>
        <p>Гуанжоу агуулах</p>
      </div>

      {renderInputField("Урт (см)", length, setLength, calculateBy === "weight")}
      {renderInputField("Өргөн (см)", width, setWidth, calculateBy === "weight")}
      {renderInputField("Өндөр (см)", height, setHeight, calculateBy === "weight")}
      {renderInputField("Жин (кг)", weight, setWeight, calculateBy === "volume")}

      <div className="mb-4">
        <label className="block mb-2">Тооцооллын арга</label>
        <div className="flex gap-4">
          <button
            onClick={() => setCalculateBy("weight")}
            className={`px-4 py-2 rounded ${
              calculateBy === "weight" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Жингээр
          </button>
          <button
            onClick={() => setCalculateBy("volume")}
            className={`px-4 py-2 rounded ${
              calculateBy === "volume" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Овроор бодох
          </button>
        </div>
      </div>

      <button
        onClick={calculateCost}
        className="w-full bg-green-500 text-white py-2 rounded mb-4"
      >
        Тооцоолох
      </button>

      {result !== null && (
        <div className="p-4 bg-gray-100 rounded">
          <h3 className="font-semibold">Тооцооллын үр дүн:</h3>
          <p className="text-xl">
            {result} ¥ {/* Updated symbol */}
          </p>
        </div>
      )}

      <div className="mt-6 text-sm text-gray-600">
        <h3 className="font-semibold mb-2">Тээврийн зардал бодох аргачлал:</h3>
        <ul className="list-disc pl-5">
          <li>0–1кг хүртэл = 3,000 ¥ (1 кг тутамд 3,000 ¥, 1м3 = 599¥)</li>
          <li>
            Тусдал ирсэн болон бусад дамжуулалтын барааг тус тусдад нь бодно
          </li>
          <li>
            Овор ихтэй ууттай куртик, хүнжил гэх мэт ауулын овор хэмжээнээс
            хамаараад ойролцоогоор 5000¥–10000¥ хооронд байдаг
          </li>
          <li>Гутлын хайрцаг 4000¥–8000¥ хооронд</li>
          <li>
            Тээврийн зардал нь тухайн барааны жин болон Оврын жин хоёрын аль
            ихээр нь тооцно
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ShippingCalculator;
