import { Clock, PhoneCall } from "lucide-react";

export const Poster = ({ data }: posterProps) => {
  return (
    <div className="w-full flex h-fit bg-white p-4 rounded-sm gap-3">
      <img
        className="w-[121px] h-[170px] bg-amber-200 rounded-sm object-cover"
        src={data?.image || "/default.jpg"}
        alt={data?.title || "Branch"}
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
