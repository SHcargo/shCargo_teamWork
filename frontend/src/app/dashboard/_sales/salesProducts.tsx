"use client";

import AddSalesProducts from "./_components/AddProduct";
import Products from "./_components/Products";

const SalesProducts = () => {
  return (
    <div className="w-full h-full border p-4 rounded-2xl">
      <AddSalesProducts />
      <Products />
    </div>
  );
};

export default SalesProducts;
