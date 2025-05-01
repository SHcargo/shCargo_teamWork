/* eslint-disable @next/next/no-img-element */

import EditSalesProduct from "./EditSalesProduct";
import { useSalesProducts } from "@/app/providers/SalesProvider";
import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

const Products = () => {
  const { products } = useSalesProducts();
  const [selectedId, setSelectedId] = useState("");

  return (
    <div>
      <div className="flex gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="border w-[250px] h-[250px] flex flex-col items-center justify-center rounded-2xl"
          >
            <img
              src={product?.image}
              style={{ width: 100, height: 100 }}
              alt={product?.title}
            />
            <p>{product?.title}</p>
            <p>{product?.price}$</p>
            <p>{product?.description}</p>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  onClick={() => setSelectedId(product._id)}
                  className="mt-2 border px-4 py-1 rounded bg-gray-100"
                >
                  Edit
                </button>
              </DialogTrigger>
              <EditSalesProduct selectedId={selectedId} />
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
