/* eslint-disable @next/next/no-img-element */
import { useSalesProducts } from "@/app/providers/SalesProvider";
import { useRouter } from "next/navigation";

const Sales = () => {
  const { products } = useSalesProducts();

  const router = useRouter();
  return (
    <div className="w-screen h-screen flex flex-col bg-white items-center justify-center">
      <div className="max-w-2xl w-full h-full bg-[#e9ecef]  px-6 py-4">
        <div>
          <p className="font-bold text-2xl">Бэлэн бараа</p>
        </div>
        <div className="grid flex-wrap grid-cols-2 space-y-4 mt-[50px]">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => router.push(`/selectedProducts/${product._id}`)}
              className="border w-[300px] h-[300px] space-y-2 flex flex-col bg-white items-center justify-center rounded-2xl hover:scale-110 hover:bg-red-300"
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Sales;
