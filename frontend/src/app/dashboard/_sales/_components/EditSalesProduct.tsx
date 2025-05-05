"use client";

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Formik, Form } from "formik";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSalesProducts } from "@/app/providers/SalesProvider";

type ProductType = {
  title: string;
  price: number;
  description: string;
  image: string;
};

const CLOUDINARY_CLOUD_NAME = "dnxg6ckrh";
const CLOUDINARY_UPLOAD_PRESET = "ml_default";
const API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  try {
    const response = await axios.post(API_URL, formData);
    return response.data.secure_url;
  } catch (error) {
    console.error("Image upload failed", error);
    return null;
  }
};

const EditSalesProduct = ({ selectedId }: { selectedId: string }) => {
  const { fetchProducts } = useSalesProducts();
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );

  const getSelectedProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sales/${selectedId}`
      );
      setSelectedProduct(response.data.data);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    getSelectedProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const handleSubmit = async (values: ProductType) => {
    try {
      if (newImageFile) {
        const uploadedUrl = await uploadImageToCloudinary(newImageFile);
        if (uploadedUrl) {
          values.image = uploadedUrl;
        } else {
          alert("Image upload failed.");
          return;
        }
      }

      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sales/${selectedId}`,
        values
      );
      alert("Product updated!");
      fetchProducts();
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update product.");
    }
  };

  if (!selectedProduct) {
    return <div></div>;
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogDescription>Edit the product details below.</DialogDescription>
      </DialogHeader>

      <Formik
        initialValues={{
          title: selectedProduct.title,
          price: selectedProduct.price,
          description: selectedProduct.description,
          image: selectedProduct.image,
        }}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, handleChange }) => (
          <Form className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                name="title"
                className="col-span-3"
                value={values.title}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                name="price"
                type="number"
                className="col-span-3"
                value={values.price}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Image</Label>
              <input
                type="file"
                accept="image/*"
                className="col-span-3"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setNewImageFile(file);
                  }
                }}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                name="description"
                className="col-span-3"
                value={values.description}
                onChange={handleChange}
              />
            </div>

            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </Form>
        )}
      </Formik>
    </DialogContent>
  );
};

export default EditSalesProduct;
