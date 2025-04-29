"use client";
import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";

const PhoneScanner = () => {
  const fetchTruckItem = async (trackingNumber: string) => {
    console.log("Fetching data for tracking number:", trackingNumber);
    try {
      // Dynamically use the scanned trackingNumber
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/truckItems/scan/${trackingNumber}`
      );
      console.log("🚚 Truck item response:", response.data);
      alert(`Truck data: ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error("❌ Error fetching truck item:", error);
      alert("Error fetching tracking data");
    }
  };

  const extractTrackingNumber = (decodedText: string) => {
    const url = new URL(decodedText);
    const params = new URLSearchParams(url.search);
    return params.get("text") || "";  // Extract 'text' parameter value from the URL
  };

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250,
      },
      false
    );

    scanner.render(
      (decodedText: string) => {
        console.log("✅ Scanned QR code:", decodedText);
        scanner.clear(); // Stop scanner

        const trackingNumber = extractTrackingNumber(decodedText);
        console.log("🚚 Extracted Tracking Number:", trackingNumber);

        alert(`QR Code Scanned: ${trackingNumber}`);
        fetchTruckItem(trackingNumber); // Pass the extracted tracking number
      },
      (error: string) => {
        console.warn("⚠️ QR scan error:", error);
      }
    );

    return () => {
      scanner.clear().catch(console.error);
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Scan QR Code with your phone</h2>
      <div
        id="qr-reader"
        className="w-full max-w-md mx-auto"
        style={{ height: "400px" }}
      ></div>
    </div>
  );
};

export default PhoneScanner;
