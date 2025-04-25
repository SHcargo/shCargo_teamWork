"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  ChevronLeft,
  ClipboardCopy,
  Globe,
  Phone,
  MapPin,
  Tag,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Define a type for the location data to replace `any`
interface LocationData {
  userPhoneNumber: string | number;
  factoryPhoneNumber: string | number;
  region: string;
  location: string;
  zipCode: string | number;
}

const DetailedAddress = () => {
  const router = useRouter();

  const [locationData, setLocationData] = useState<LocationData | null>(null); // Use LocationData type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocationData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/location`
        );
        console.log("API Response:", response.data);
        setLocationData(response.data.location); // Assuming the response has a `location` field
        setLoading(false);
      } catch (err) {
        console.error("Failed to get location:", err);
        setLoading(false);
      }
    };

    getLocationData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!locationData) {
    return <div>No location data found.</div>;
  }

  return (
    <div className="w-screen h-screen flex flex-col bg-[#dddddd] items-center justify-center">
      <div className="max-w-2xl w-full h-full bg-[#e9ecef] px-6 py-4 flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <Button className="bg-white p-2" onClick={() => router.back()}>
            <ChevronLeft className="text-black" />
          </Button>
          <h1 className="text-xl font-bold">Эрээн</h1>
        </div>

        <div className="flex justify-between border bg-white p-4 rounded-sm text-center">
          <div>
            <p className="text-sm">1кг ачаа</p>
            <p className="font-semibold">3000 ₮</p>
          </div>
          <div>
            <p className="text-sm">1м3-с доош</p>
            <p className="font-semibold">599 ¥ </p>
          </div>
          <div>
            <p className="text-sm">1м3-с дээш</p>
            <p className="font-semibold">399 ¥</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Add null checks before calling `toString()` */}
          <CopyField
            label="收件人 (Хүлээн авагч)"
            text={
              locationData.userPhoneNumber
                ? locationData.userPhoneNumber.toString()
                : "N/A"
            }
            Icon={User}
          />
          <CopyField
            label="电话 (Утас)"
            text={
              locationData.factoryPhoneNumber
                ? locationData.factoryPhoneNumber.toString()
                : "N/A"
            }
            Icon={Phone}
          />
          <CopyField
            label="所在地区 (Бүс нутаг)"
            text={locationData.region || "N/A"}
            Icon={Globe}
          />
          <CopyField
            label="街道地址 (Хаяг)"
            text={locationData.location || "N/A"}
            Icon={MapPin}
          />
          <CopyField
            label="邮编 (Зип код)"
            text={
              locationData.zipCode ? locationData.zipCode.toString() : "N/A"
            }
            Icon={Tag}
          />
        </div>
      </div>
    </div>
  );
};

const CopyField = ({
  label,
  text,
  Icon,
}: {
  label: string;
  text: string;
  Icon: React.ElementType;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <p className="text-sm mb-1 flex items-center gap-2">
        <Icon className="w-4 h-4" />
        {label}
      </p>
      <div className="border bg-white rounded-sm p-3 flex items-center justify-between">
        <span className="text-sm">{text}</span>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 text-blue-600 text-xs"
        >
          <ClipboardCopy className="w-4 h-4" />
          <span>{copied ? "Хуулсан" : "Хуулах"}</span>
        </button>
      </div>
    </div>
  );
};

export default DetailedAddress;
