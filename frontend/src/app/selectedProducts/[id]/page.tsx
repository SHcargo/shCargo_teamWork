// src/app/selectedProducts/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import BuySelectedProduct from "../page";
 // adjust if your structure is different

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {id ? <BuySelectedProduct selectedId={id} /> : <p>Product ID is missing.</p>}
    </div>
  );
};

export default ProductPage;
