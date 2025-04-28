"use client";

import SubHeader from "./components/SubHeader";
import { Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddAddressContent from "./components/AddAddressContent";
import { useDeliveryAddress } from "../providers/DeliveryAddressProvider";
import { NotebookPen, Trash2Icon } from "lucide-react";
import EditAddressContent from "./components/EditAddressContent";
import { useState } from "react";
import { DeleteConfirm } from "./components/DeleteConfirm";
import AddPinPointContent from "./components/AddPinPointContent";

const DeliveryAddress = () => {
  const { addresses } = useDeliveryAddress();
  const [selectedAddress, setSelectedAddress] = useState("");
  console.log("delivery address", addresses);
  return (
    <div className="bg-[rgb(221,221,221) w-screen flex flex-col justify-center items-center h-screen">
      <SubHeader />
      <div className="max-w-2xl w-full h-full bg-[#e9ecef] flex flex-col gap-4 p-4">
        <div className=" w-full h-auto rounded-lg flex flex-col gap-4">
          {addresses?.map((address) => (
            <div key={address._id} className="flex gap-4 justify-between ">
              <div className="bg-white w-full p-4 rounded-lg">
                <h1 className="font-semibold">{address.detail}</h1>
                <p className="text-[14px] text-gray-400">
                  {address.city}, {address.district}, {address.khoroo}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Dialog>
                  <DialogTrigger>
                    <div
                      className="p-2 bg-white rounded-lg"
                      onClick={() => setSelectedAddress(address._id)}
                    >
                      <NotebookPen stroke="black" />
                    </div>
                  </DialogTrigger>
                  <EditAddressContent
                    selectedAddress={selectedAddress ? selectedAddress : ""}
                  />
                </Dialog>

                <Dialog>
                  <DialogTrigger>
                    <div
                      className="p-2 bg-white rounded-lg"
                      onClick={() => setSelectedAddress(address._id)}
                    >
                      <Trash2Icon stroke="red" />
                    </div>
                  </DialogTrigger>
                  <DeleteConfirm
                    selectedAddress={selectedAddress ? selectedAddress : ""}
                  />
                </Dialog>
              </div>
            </div>
          ))}
        </div>

        <Dialog>
          <DialogTrigger>
            <div className="flex justify-center items-center py-2 cursor-pointer px-4 bg-[#5F2DF5] w-full text-white gap-2 rounded-lg">
              <Plus width={16} height={16} stroke="white" />{" "}
              <p>Шинэ хаяг гараар нэмэх</p>
            </div>
          </DialogTrigger>
          <AddAddressContent />
        </Dialog>
        <Dialog>
          <DialogTrigger>
            <div className="flex justify-center items-center py-2 cursor-pointer px-4 bg-[#5F2DF5] w-full text-white gap-2 rounded-lg">
              <Plus width={16} height={16} stroke="white" />{" "}
              <p>Шинэ хаяг газрын зурагаас нэмэх</p>
            </div>
          </DialogTrigger>
          <AddPinPointContent />
        </Dialog>
      </div>
    </div>
  );
};

export default DeliveryAddress;
