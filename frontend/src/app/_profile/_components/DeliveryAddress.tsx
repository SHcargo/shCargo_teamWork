"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { LocationEdit, Trash2Icon } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useDeliveryAddress } from "@/app/providers/DeliveryAddressProvider";
import AddAddressContent from "./AddAddressContent";
import { DeleteConfirm } from "./DeleteConfirm";

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });

const DeliveryAddress = () => {
  const { addresses } = useDeliveryAddress();
  const [selectedAddress, setSelectedAddress] = useState("");
  console.log(addresses);

  return (
    <div className="w-full h-full cursor-default overflow-auto p-4 flex flex-col gap-6 rounded-lg bg-white">
      <div className="flex items-center gap-2">
        <LocationEdit className="w-4 h-4" />
        <h1 className="text-base font-medium">Миний хаяг</h1>
      </div>

      <div className="flex flex-col gap-4">
        {addresses?.length > 0 ? (
          addresses.map((address) => {
            console.log(address.district);
            return (
              <div
                key={address._id}
                className="p-4 border cursor-default border-gray-200 rounded-xl shadow-sm bg-gray-50 flex flex-col gap-4"
              >
                <h2 className="text-sm font-semibold text-gray-800">
                  {address.detail}
                </h2>

                {address.accuracy > 0 &&
                address.accuracy <= 100 &&
                address.lat !== 0 &&
                address.lng !== 0 ? (
                  <LeafletMap latitude={address.lat} longitude={address.lng} />
                ) : (
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>
                      <span className="font-medium">Дүүрэг: </span>
                      <span>{address.district}</span>
                    </div>
                    <div>
                      <span className="font-medium">Хороо: </span>
                      <span>{address.khoroo}</span>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        className="p-2 rounded-lg bg-white hover:bg-gray-100 border cursor-pointer"
                        onClick={() => setSelectedAddress(address._id)}
                      >
                        <Trash2Icon className="w-4 h-4 text-red-500" />
                      </button>
                    </DialogTrigger>
                    <DeleteConfirm selectedAddress={selectedAddress} />
                  </Dialog>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-sm text-gray-500">
            Бүртгэлтэй хаяг байхгүй байна.
          </div>
        )}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <button className="mt-2 bg-[#101010] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-950">
            <span>Шинэ хаяг нэмэх</span>
          </button>
        </DialogTrigger>
        <AddAddressContent />
      </Dialog>
    </div>
  );
};

export default DeliveryAddress;
