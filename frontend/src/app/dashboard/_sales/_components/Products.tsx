/* eslint-disable @next/next/no-img-element */
import { useSalesProducts } from "@/app/providers/SalesProvider";

const Products = () => {
  const { products } = useSalesProducts();

  return (
    <div className="flex gap-8">
      {products.map((product) => (
        <div
          key={product.title}
          className="border w-[250px] h-[250px] flex gap-4 items-center justify-center rounded-2xl"
        >
          <div>
            <p>{product.title}</p>
            <img
              src={product.image}
              style={{ width: 100, height: 100 }}
              alt={product.title}
            />
            <p>{product.price}</p>
            <p>{product.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Products;
