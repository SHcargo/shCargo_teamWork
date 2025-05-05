"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
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

const CLOUDINARY_CLOUD_NAME = "dnxg6ckrh";
const CLOUDINARY_UPLOAD_PRESET = "ml_default";
const API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

const AddSalesProducts = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
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

  const handleSubmit = async () => {
    if (!title || !price || !imageFile || !description) {
      alert("Please fill in all fields including image.");
      return;
    }

    setUploading(true);

    const imageUrl = await uploadImageToCloudinary(imageFile);
    if (!imageUrl) {
      alert("Failed to upload image.");
      setUploading(false);
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/sales`, {
        title,
        price: Number(price),
        image: imageUrl,
      });
      alert("Product created successfully!");
      setTitle("");
      setPrice("");
      setImageFile(null);
      setDescription("");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between">
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
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  className="col-span-3"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  className="col-span-3"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
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
              <div>
                <Label>Description</Label>
                <Input
                  id="description"
                  type="text"
                  className="col-span-3"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
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

export default AddSalesProducts;
