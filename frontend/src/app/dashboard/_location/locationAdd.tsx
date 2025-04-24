"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/app/providers/UserProvider";

const LocationAdd = ({ setStep }: { setStep: (value: string) => void }) => {
  const router = useRouter();
  const [location, setLocation] = useState();
  const [existingLocation, setExistingLocation] = useState(false);
  const [formData, setFormData] = useState({
    userPhoneNumber: "",
    factoryPhoneNumber: "",
    region: "",
    location: "",
    zipCode: "",
  });

  const { phoneNumber } = useUser();

  useEffect(() => {
    const getLocationData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/location`
        );
        const loc = response?.data.location[0];

        if (loc) {
          setExistingLocation(true);
          setFormData({
            userPhoneNumber: loc.userPhoneNumber || "",
            factoryPhoneNumber: loc.factoryPhoneNumber || "",
            region: loc.region || "",
            location: loc.location || "",
            zipCode: loc.zipCode || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch location:", error);
      }
    };

    getLocationData();
  }, []);

  console.log(location);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/location`, {
        method: existingLocation ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Location saved:", data.location);
        // setStep("success");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  console.log(formData);

  return (
    <div className="w-full h-full p-4">
      <div className="w-[600px] h-auto border outline-1 p-4 rounded-sm space-y-8">
        <div className="border-b-2 p-2">
          <p className="font-bold">ЭРЭЭН АГУУЛАХЫН ХАЯГ</p>
        </div>
        <div>
          <p>Хүлээн авагчийн утасны дугаар</p>
          <Input
            name="userPhoneNumber"
            value={formData.userPhoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Утасны дугаар</p>
          <Input
            name="factoryPhoneNumber"
            value={formData.factoryPhoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Бүс нутаг</p>
          <Input
            name="region"
            value={formData.region}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Хаяг</p>
          <Input
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Зип код</p>
          <Input
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
          />
        </div>
        <div>
          <Button onClick={handleSubmit}>Confirm</Button>
        </div>
      </div>
    </div>
  );
};

export default LocationAdd;
