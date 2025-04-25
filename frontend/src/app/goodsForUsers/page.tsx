"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import Image from next/image

export const GoodsForUsers = () => {
  const router = useRouter();

  const categories = ["Бүгд", "Бүртгэсэн", "Замдаа", "УБ-д ирсэн", "Хаагдсан"];
  return (
    <div className="w-screen h-screen flex flex-col bg-[#dddddd] items-center justify-center">
      <div className="max-w-2xl w-full h-full bg-[#e9ecef] px-6 py-4 flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <Button className="bg-white p-2" onClick={() => router.back()}>
            <ChevronLeft className="text-black" />
          </Button>
          <h1 className="text-xl font-bold"></h1>
        </div>
        <div className="flex gap-4 w-full p-4 rounded-sm bg-white ">
          <div>
            {/* Replace <img> with <Image> */}
            <Image
              src="aa" // Update this with a valid image source or path
              alt="Truck Image" // Provide a meaningful alt text
              className="w-40 h-40 bg-amber-300 rounded-sm"
              width={160} // Add width
              height={160} // Add height
            />
          </div>
          <div>
            <h1 className="text-sky-400">truck Number</h1>
            {categories.map((cat, index) => (
              <p key={index}>
                {cat} <span className="text-red-300">date</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodsForUsers;
