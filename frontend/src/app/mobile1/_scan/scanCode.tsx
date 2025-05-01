"use client";
import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";

const ScanCode = () => {
  const [loading, setLoading] = useState(false);

  const fetchTruckItem = async (trackingNumber: string, phone: string) => {
    console.log("Fetching data for tracking number:", trackingNumber);
    setLoading(true);

    try {
      // Dynamically use the scanned trackingNumber and pass the phone number in the request
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/truckItems/scan/${trackingNumber}`,
        { phoneNumber: phone } // Sending the phone number as part of the request body
      );

      console.log("🚚 Truck item response:", response.data);

      // Assuming the response is JSON, but check if it's actually a string or other format
      const truckData =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;

      // Example formatted output, adjust based on your actual response structure
      alert(
        `Truck Number: ${truckData.truckNumber}\nStatus: ${truckData.status}\nLocation: ${truckData.location}`
      );
    } catch (error) {
      console.error("❌ Error fetching truck item:", error);
    } finally {
      setLoading(false);
    }
  };
  const postItemsTruck = async (trackingNumber: string, phone: string) => {
    console.log("Fetching data for tracking number:", trackingNumber);
    setLoading(true);

    try {
      // Dynamically use the scanned trackingNumber and pass the phone number in the request
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/truckItems/scan/${trackingNumber}`,
        { phoneNumber: phone } // Sending the phone number as part of the request body
      );

      console.log("🚚 Truck item response:", response.data);

      // Check if the response data is a string and parse it accordingly
      const truckData =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;

      // Assuming the response contains the truck number, status, and location (adjust as needed)
      alert(
        `Truck Number: ${truckData.trackingNumber}\nStatus: ${truckData.status}\nLocation: ${truckData.location}`
      );
    } catch (error) {
      console.error("❌ Error fetching truck item:", error);
    } finally {
      setLoading(false); // Ensure loading state is always reset after the request completes
    }
  };

  const extractTrackingData = (decodedText: string) => {
    try {
      const data = JSON.parse(decodedText); // Assuming the QR code value is a JSON string
      if (data && data.truck) {
        fetchTruckItem(data.truck, data.phone); // Use the 'truck' number from the QR code
        postItemsTruck(data.truck, data.phone);
      } else {
        alert("Invalid QR code format");
      }
    } catch (error) {
      console.error("Error parsing QR code:", error);
      alert("Error processing QR code");
    }
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

        console.log("🚚 Extracted Tracking Number:", decodedText);
        alert(`QR Code Scanned: ${decodedText}`);
        extractTrackingData(decodedText);
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
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
        Scan QR Code with Your Phone
      </h2>
      <div
        id="qr-reader"
        className="w-full max-w-md mx-auto mb-6 "
        style={{ height: "400px" }}
      ></div>
      {loading && (
        <div className="text-center text-xl text-gray-500">
          Loading truck data...
        </div>
      )}
    </div>
  );
};

export default ScanCode;
