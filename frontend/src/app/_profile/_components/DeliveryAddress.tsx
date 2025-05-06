"use client";

import { Plus, LocationEdit, NotebookPen, Trash2Icon } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useDeliveryAddress } from "@/app/providers/DeliveryAddressProvider";
import AddAddressContent from "./AddAddressContent";
import { useState } from "react";
import dynamic from "next/dynamic";
import { DeleteConfirm } from "./DeleteConfirm";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
});

const DeliveryAddress = () => {
  const { addresses } = useDeliveryAddress();
  const [selectedAddress, setSelectedAddress] = useState("");
  console.log("delivery address", addresses);

  return (
    <div className="w-full  p-4 gap-4 h-full flex flex-col overflow-scroll  rounded-lg bg-white">
      <div className="flex gap-2 items-center">
        <LocationEdit width={16} height={16} />
        <h1 className="font-medium">Миний хаяг</h1>
      </div>
      <div className="w-full h-auto rounded-lg flex flex-col gap-4">
        {addresses?.length > 0 ? (
          addresses.map((address) => (
            <div
              key={address._id}
              className="flex flex-col gap-4 p-4 justify-between border-2 rounded-lg"
            >
              <div className="bg-white w-full rounded-lg">
                <h1 className="font-semibold mb-6">{address.detail}</h1>
                {address.lat && address.lng && (
                  <LeafletMap latitude={address.lat} longitude={address.lng} />
                )}
              </div>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger>
                    <div
                      className="p-2 bg-white rounded-lg"
                      onClick={() => setSelectedAddress(address._id)}
                    >
                      <NotebookPen stroke="black" />
                    </div>
                  </DialogTrigger>
                </Dialog>

                <Dialog>
                  <DialogTrigger>
                    <div
                      className="p-2 bg-white rounded-lg cursor-pointer"
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
          ))
        ) : (
          <div className="text-center text-sm text-gray-500">
            Бүртгэлтэй хаяг байхгүй байна.
          </div>
        )}
      </div>

      <Dialog>
        <DialogTrigger>
          <div className="flex justify-center items-center py-2 cursor-pointer px-4 bg-[#101010] w-full text-white gap-2 rounded-lg">
            <Plus width={16} height={16} stroke="white" />{" "}
            <p>Шинэ хаяг нэмэх</p>
          </div>
        </DialogTrigger>
        <AddAddressContent />
      </Dialog>
    </div>
  );
};

export default DeliveryAddress;
