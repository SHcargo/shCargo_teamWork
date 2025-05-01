import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const CLOUDINARY_CLOUD_NAME = "dnxg6ckrh";
const CLOUDINARY_UPLOAD_PRESET = "ml_default";
const API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

const ImageGenerator = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState(""); // Renamed to trackingNumber for clarity
  const [errorMessage, setErrorMessage] = useState(""); // For error display

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!imageFile || !trackingNumber) {
      setErrorMessage("Please fill in all fields including image.");
      return;
    }

    setUploading(true);
    setErrorMessage(""); // Clear previous error messages

    const imageUrl = await uploadImageToCloudinary(imageFile);
    if (!imageUrl) {
      setErrorMessage("Failed to upload image.");
      setUploading(false);
      return;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${trackingNumber}`,
        {
          image: imageUrl,
        }
      );
      alert("Product created successfully!");
      setTrackingNumber(""); // Clear the input
      setImageFile(null); // Clear the file input
    } catch (error) {
      console.error("Error creating product:", error);
      setErrorMessage("Failed to create product.");
    } finally {
      setUploading(false);
    }
  };

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    try {
      const res = await axios.post(API_URL, formData);
      return res.data.secure_url;
    } catch (err) {
      console.error("Error uploading image:", err);
      return null;
    }
  };

  return (
    <div>
      <div className="w-full">
        <p className="text-lg font-semibold mb-4">Products</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add product</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="trackingNumber" className="text-right">
                  Tracking Number
                </Label>
                <Input
                  id="trackingNumber"
                  type="text"
                  className="col-span-3"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                <Input
                  id="image"
                  type="file"
                  className="col-span-3"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}

            <DialogFooter>
              <Button onClick={handleSubmit} disabled={uploading}>
                {uploading ? "Uploading..." : "Save changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ImageGenerator;
