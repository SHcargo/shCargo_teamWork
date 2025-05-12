/* eslint-disable @next/next/no-img-element */
import { useSalesProducts } from "@/app/providers/SalesProvider";
import { useRouter } from "next/navigation";

const Sales = () => {
  const { products } = useSalesProducts();
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex flex-col bg-white items-center justify-start">
      <div className="w-full max-w-2xl h-screen bg-white px-4 sm:px-6  rounded-md shadow-md flex flex-col gap-6 overflow-auto">
        <div className="max-w-6xl w-full">
          <p className="font-bold text-2xl mb-6 text-center sm:text-left">
            Бэлэн бараа
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                onClick={() => router.push(`/selectedProducts/${product._id}`)}
                className="cursor-pointer border bg-white rounded-2xl p-4 flex flex-col items-center hover:scale-105 transition-transform shadow-sm hover:shadow-lg"
              >
                <img
                  src={product?.image}
                  alt={product?.title}
                  className="w-full h-48 object-contain rounded-md"
                />
                <p className="font-semibold text-gray-700 text-lg mt-4 text-center">
                  {product?.title}
                </p>
                <p className="font-medium text-black text-base mt-1">
                  {product?.price}$
                </p>
              </div>
            ))}
          </div>
          <div className="h-[90px]"></div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
