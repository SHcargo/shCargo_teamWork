/* eslint-disable @next/next/no-img-element */

import EditSalesProduct from "./EditSalesProduct";
import { useSalesProducts } from "@/app/providers/SalesProvider";
import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import { Button } from "@/components/ui/button";

const Products = () => {
  const { products } = useSalesProducts();
  const [selectedId, setSelectedId] = useState("");

  const handleDeleteProduct = async (_id: string) => {
    const confirmed = confirm("delete this product?");
    if (!confirmed) return;

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sales/${_id}`
      );
      if (response.status === 200) {
        alert("Product deleted successfully.");
      } else {
        alert(response.data?.message || "Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product.");
    }
  };

  return (
    <div>
      <div className="flex gap-8 flex-wrap">
        {products.map((product) => (
          <div
            key={product._id}
            className="border w-[350px] h-[350px] space-y-2 flex flex-col items-center justify-center rounded-2xl"
          >
            <img
              src={product?.image}
              style={{ width: 200, height: 200 }}
              alt={product?.title}
            />

            <p className="font-semibold text-gray-600 text-xl">
              {" "}
              {product?.title}
            </p>
            <p className="font-medium text-black text-base md:text-[18px] text-dark">
              {product?.price}$
            </p>

            <p>{product?.description}</p>
            <div className="flex gap-10">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedId(product._id)}
                  >
                    Edit
                  </Button>
                </DialogTrigger>
                <EditSalesProduct selectedId={selectedId} />
              </Dialog>
              <Button
                variant="outline"
                onClick={() => handleDeleteProduct(product._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
