import SubHeader from "./components/SubHeader";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddAddressContent from "./components/AddAddressContent";

const DeliveryAddress = () => {
  return (
    <div className="bg-[rgb(221,221,221) w-screen flex flex-col justify-center items-center h-screen">
      <SubHeader />
      <div className="max-w-2xl w-full h-full bg-[#e9ecef] flex flex-col gap-4 p-4">
        <div className="bg-white w-full h-[100px] rounded-lg"></div>

        <Dialog>
          <DialogTrigger>
            <div className="flex justify-center items-center py-2 cursor-pointer px-4 bg-[#5F2DF5] w-full text-white gap-2 rounded-lg">
              <Plus width={16} height={16} stroke="white" />{" "}
              <p>Шинэ хаяг нэмэх</p>
            </div>
          </DialogTrigger>
          <AddAddressContent />
        </Dialog>
      </div>
    </div>
  );
};

export default DeliveryAddress;
