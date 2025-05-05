import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaBarcode } from "react-icons/fa"; // or another barcode icon
import { IoIosArrowForward } from "react-icons/io";

const AccountDialog = () => {
  return (
    <div className="w-full relative -top-5 bg-white rounded-xl p-2 shadow">
      <p className="font-semibold mb-2">Илгээмж бүртгэх</p>
      <div className="flex items-center gap-2 h-12 bg-gray-100 px-4 py-3 rounded-lg shadow-inner">
        <FaBarcode className="text-xl text-black" />
        <input
          type="text"
          placeholder="Илгээмжийн дугаар бичих"
          className="flex-1 bg-transparent outline-none text-l text-gray-700 placeholder:text-gray-400"
        />
        <Button
          size="icon"
          className="bg-black hover:bg-blue-500 text-white rounded-full"
        >
          <IoIosArrowForward size={20} />
        </Button>
      </div>
    </div>
  );
};

export default AccountDialog;
