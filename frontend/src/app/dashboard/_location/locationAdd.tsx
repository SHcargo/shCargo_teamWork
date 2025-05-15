"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";

const CLOUDINARY_CLOUD_NAME = "dnxg6ckrh";
const CLOUDINARY_UPLOAD_PRESET = "ml_default";
const API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

const LocationAdd = () => {
  const [formData, setFormData] = useState({
    salbar: "",
    detail: "",
    dugaar: "",
    workinHours: "",
    weekend: "",
    image: "", // Will store the Cloudinary URL
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadImageToCloudinary = async (file: File) => {
    const imgData = new FormData();
    imgData.append("file", file);
    imgData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await axios.post(API_URL, imgData);
      return res.data.secure_url;
    } catch (err) {
      console.error("Image upload error:", err);
      return null;
    }
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = "";

      if (imageFile) {
        setUploading(true);
        const uploaded = await uploadImageToCloudinary(imageFile);
        setUploading(false);

        if (!uploaded) {
          alert("Image upload failed");
          return;
        }

        imageUrl = uploaded;
      }

      const submissionData = {
        ...formData,
        image: imageUrl,
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/help/salbar`,
        submissionData
      );

      console.log("Location saved:", res.data.location);
      // Optionally reset form or show success
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="w-full h-full p-4">
      <div className="w-[600px] h-auto border outline-1 p-4 rounded-sm space-y-8">
        <div className="border-b-2 p-2">
          <p className="font-bold">САЛБАРЫН ХАЯГ</p>
        </div>

        <div>
          <p>Салбар</p>
          <Input
            name="salbar"
            value={formData.salbar}
            onChange={handleChange}
          />
        </div>

        <div>
          <p>Дэлгэрэнгүй Хаяг</p>
          <Input
            name="detail"
            value={formData.detail}
            onChange={handleChange}
          />
        </div>

        <div>
          <p>Утасны дугаар</p>
          <Input
            name="dugaar"
            value={formData.dugaar}
            onChange={handleChange}
          />
        </div>

        <div>
          <p>Aжиллах цагийн хуваарь</p>
          <Input
            name="workinHours"
            value={formData.workinHours}
            onChange={handleChange}
          />
        </div>

        <div>
          <p>Амралт</p>
          <Input
            name="weekend"
            value={formData.weekend}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="image" className="text-right">
            Зураг
          </Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            className="col-span-3"
            onChange={handleImageChange}
          />
        </div>

        <div>
          <Button onClick={handleSubmit} disabled={uploading}>
            {uploading ? "Uploading..." : "Confirm"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationAdd;
