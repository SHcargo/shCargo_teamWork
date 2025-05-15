/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import axios from "axios";
import { QrStatusSelector } from "@/components/ui/qrStatusSelector";

const ScanCode = () => {
  const [loading, setLoading] = useState(false);
  const [activeStatus, setActiveStatus] = useState<string>('');
  const [scannerInstance, setScannerInstance] = useState<Html5Qrcode | null>(null);
console.log(activeStatus)
  const fetchTruckItem = async (trackingNumber: string, phone: string) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/truckItems/scan/${trackingNumber}`,
        {
          phoneNumber: phone,
          status: activeStatus,
        }
      );
      const truckData = typeof response.data === "string" ? JSON.parse(response.data) : response.data;

      alert(
        `Truck Number: ${truckData.truckNumber}\nStatus: ${truckData.status}\nLocation: ${truckData.location}`
      );
    } catch (error) {
      console.error("❌ Error fetching truck item:", error);
      alert("Мэдээлэл авахад алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  const postItemsTruck = async (trackingNumber: string, phone: string) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/truckItems/scan/${trackingNumber}`,
        {
          phoneNumber: phone,
        }
      );
      const truckData = typeof response.data === "string" ? JSON.parse(response.data) : response.data;

      alert(
        `Truck Number: ${truckData.trackingNumber}\nStatus: ${truckData.status}\nLocation: ${truckData.location}`
      );
    } catch (error) {
      console.error("❌ Error posting truck item:", error);
      alert("Шинэ бүртгэл үүсгэхэд алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  const extractTrackingData = (decodedText: string) => {
    try {
      const data = JSON.parse(decodedText);
      if (data && data.truck) {
        if (activeStatus) {
          fetchTruckItem(data.truck, data.phone);
        } else {
          postItemsTruck(data.truck, data.phone);
        }
      } else {
        alert("QR кодын бүтэц буруу байна.");
      }
    } catch (error) {
      console.error("QR код уншихад алдаа гарлаа:", error);
      alert("QR код боловсруулахад алдаа гарлаа.");
    }
  };

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("qr-reader");

    Html5Qrcode.getCameras().then((cameras) => {
      if (cameras.length > 0) {
        const backCamera = cameras.find((cam) =>
          cam.label.toLowerCase().includes("back")
        ) || cameras[0];

        html5QrCode
          .start(
            backCamera.id,
            { fps: 10, qrbox: 250 },
            (decodedText) => {
              console.log("✅ Scanned QR code:", decodedText);
              html5QrCode.stop().then(() => html5QrCode.clear());
              extractTrackingData(decodedText);
            },
            (errorMessage) => {
               console.warn("⚠️ QR scan error:", errorMessage); 
            }
          )
          .catch((err) => {
            console.error("❌ Failed to start scanner:", err);
            alert("Камерыг эхлүүлэхэд алдаа гарлаа.");
          });

        setScannerInstance(html5QrCode);
      } else {
        alert("Камер олдсонгүй.");
      }
    });

    return () => {
      if (scannerInstance) {
        scannerInstance.stop().then(() => scannerInstance.clear()).catch(console.error);
      }
    };
  }, [activeStatus]);

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
        Утасны камераар QR код уншуулах
      </h2>
      <QrStatusSelector
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
      />
      <div
        id="qr-reader"
        className="w-full max-w-md mx-auto mb-6"
        style={{ height: "400px" }}
      ></div>
      {loading && (
        <div className="text-center text-xl text-gray-500">
          Мэдээлэл ачааллаж байна...
        </div>
      )}
    </div>
  );
};

export default ScanCode;
