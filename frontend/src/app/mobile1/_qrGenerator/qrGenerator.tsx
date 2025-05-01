/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react"; // Use named export QRCodeSVG instead of default export

const QrGenerator = () => {
  const [jsonData, setJsonData] = useState("");
  const [isValidJson, setIsValidJson] = useState(true);

  // Example JSON object
  const exampleJson = {
    truck: "1234",
    phone: "12345678",
  };

  // Convert JSON to a string (QR code needs string data)
  const jsonString = JSON.stringify(exampleJson);

  const handleChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setJsonData(value);

    // Validate JSON if not empty
    if (value.trim()) {
      try {
        JSON.parse(value);
        setIsValidJson(true);
      } catch (error) {
        setIsValidJson(false);
      }
    } else {
      setIsValidJson(true);
    }
  };

  // Generate QR code with valid JSON or example
  const qrValue = () => {
    if (!jsonData.trim()) {
      return jsonString;
    }

    if (isValidJson) {
      try {
        // If valid JSON, make sure it's properly stringified
        return jsonData.trim();
      } catch {
        return jsonString;
      }
    }

    return jsonString;
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Generate QR Code from JSON
      </h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Enter JSON Data:
        </h3>
        <textarea
          value={jsonData}
          onChange={handleChange}
          rows={6}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your JSON here"
        />
        {!isValidJson && (
          <p className="mt-1 text-red-500 text-sm">Invalid JSON format</p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">QR Code:</h3>
        <div className="flex justify-center bg-gray-100 p-4 rounded-md">
          <QRCodeSVG value={qrValue()} size={200} level="H" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Example JSON:
        </h3>
        <pre className="bg-gray-100 p-3 rounded-md overflow-auto text-sm">
          {JSON.stringify(exampleJson, null, 2)}
        </pre>
        <button
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          onClick={() => setJsonData(JSON.stringify(exampleJson, null, 2))}
        >
          Use Example
        </button>
      </div>
    </div>
  );
};

export default QrGenerator;
