// src/app/selectedProducts/[id]/page.tsx
"use client"
import { useParams } from "next/navigation";
import BuySelectedProduct from "../page";


const ProductPage = () => {
   const { id } = useParams<{ id: string }>();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <BuySelectedProduct selectedId={id} />
    </div>
  );
};

export default ProductPage;
