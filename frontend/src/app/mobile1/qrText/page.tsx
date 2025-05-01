"use client";
import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const QRTextGenerator = () => {
  const [text, setText] = useState("");

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Generate QR Code from Text
      </h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Enter Text:
        </h3>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your text here"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">QR Code:</h3>
        <div className="flex justify-center bg-gray-100 p-4 rounded-md">
          <QRCodeSVG
            value={text || " "}
            size={200}
            level="H"
          />
        </div>
      </div>
    </div>
  );
};

export default QRTextGenerator;
