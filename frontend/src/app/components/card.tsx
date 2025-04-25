import { ChevronRight } from "lucide-react";

const Card = () => {
  return (
    <div className="w-full h-12 bg-[#fff] justify-between rounded-lg flex">
      <p className="text-[#212529]">Bla bla bla</p>
      <button className="bg-[#5F2DF5]">
        <ChevronRight />
      </button>
    </div>
  );
};

export default Card;
