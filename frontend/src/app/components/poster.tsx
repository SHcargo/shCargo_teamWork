import Image from "next/image"; // Import Image from next/image
import { Clock, PhoneCall } from "lucide-react";
type posterProps = {
  title?: string | null;
  address?: string | null;
  phoneNumber?: number | null;
  day?: string | null;
  image?: string | null;
  data?: {
    title?: string | null;
    address?: string | null;
    phoneNumber?: number | null;
    day?: string | null;
    image?: string | null;
  };
};

export const Poster = ({ data }: posterProps) => {
  return (
    <div className="w-full flex h-fit bg-white p-4 rounded-sm gap-3">
      {/* Use next/image component instead of <img> */}
      <Image
        className="w-[121px] h-[170px] bg-amber-200 rounded-sm object-cover"
        src={data?.image || "/default.jpg"}
        alt={data?.title || "Branch"}
        width={121} // Add width for optimization
        height={170} // Add height for optimization
        priority // Optional: Add 'priority' if this image is above-the-fold for faster loading
      />

      <div className="inline-flex flex-col gap-2">
        <h3 className="font-bold">{data?.title || "Салбар"}</h3>
        <p>{data?.address || "Хаяг байхгүй"}</p>

        {data?.phoneNumber && (
          <p className="flex gap-2 h-fit w-fit px-2 rounded-sm border-[0.5px] items-center">
            <PhoneCall size={16} stroke="#5F2DF5" />
            {data.phoneNumber}
          </p>
        )}

        {data?.day && (
          <p className="flex gap-2 h-fit w-fit px-2 rounded-sm border-[0.5px] items-center">
            <Clock size={16} stroke="#5F2DF5" />
            {data.day}
          </p>
        )}

        {data?.day && (
          <p className="h-fit w-fit px-2 rounded-sm text-[#5F2DF5] border-[0.5px] border-[#5F2DF5]">
            {data.day}
          </p>
        )}
      </div>
    </div>
  );
};
