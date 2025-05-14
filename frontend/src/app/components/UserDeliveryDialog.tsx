"use client";

import { useState } from "react";
import { useDeliveryAddress } from "../providers/DeliveryAddressProvider";
import { useUser } from "../providers/UserProvider";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AddAddressContent from "../_profile/_components/AddAddressContent";

type DeliveryAddress = {
  accuracy: number;
  lng: number;
  lat: number;
  _id: string;
  district: string;
  khoroo: string;
  detail: string;
  userId: string;
};


type Props = {
  trackingNumber : string,
  ref? : () => void
}
const UserDeliveryDialog = ({ trackingNumber ,ref }: Props ) => {
  const { userId, phoneNumber } = useUser();
  const { addresses } = useDeliveryAddress();
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const choosePickupOrDelivery = async (
    address: DeliveryAddress,
    trackingNumber: string
  ) => {
    if (!address || !trackingNumber) return;

    try {
      const checkResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/choosePickupOrDelivery/${trackingNumber}`
      );

      if (checkResponse.data.success === false) {
        toast.error("❌ Энэ Бараа нь аль хэдийн хаяг сонгосон байна.");
        return;
      }

      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/choosePickupOrDelivery/${userId}`,
        {
          deliveryAddress: {
            lat: address.lat,
            lng: address.lng,
            detail: address.detail,
            district: address.district,
            khoroo: address.khoroo,
            accuracy: address.accuracy,
          },
          status: "Хүргүүлэх",
          phoneNumber,
          trackingNumber,
        }
      );
      toast.success("✅ Хаяг амжилттай илгээгдлээ!");
      if(ref)
      ref()
    } catch (error) {
      toast.error("❌ Хаяг илгээхэд алдаа гарлаа!");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="w-full h-10 text-sm font-medium border border-gray-300/60 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-300 transition-colors">
            🚚 Хүргүүлэх{" "}
            {/* <span>🚫 Одоогоор хүргэлт хийх боломжгүй байна.</span> */}
          </button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Таний хаяг</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-4">
            {addresses && addresses.length > 0 ? (
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div
                    key={address._id}
                    className="p-4 border border-gray-200 rounded-xl shadow-sm bg-gray-50 flex flex-col gap-4"
                  >
                    <div className="text-sm font-semibold text-gray-800">
                      {address.detail || "Хаягийн дэлгэрэнгүй мэдээлэл байхгүй"}
                    </div>

                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex">
                        <span className="font-medium">Дүүрэг: </span>
                        <span>{address.district}</span>
                      </div>
                      <div className="flex">
                        <span className="font-medium">Хороо: </span>
                        <span>{address.khoroo}</span>
                      </div>
                    </div>

                    <button
                      className="w-full h-10 text-sm font-medium border rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-300 transition-colors"
                      onClick={() =>
                        choosePickupOrDelivery(address, trackingNumber as string)
                      }
                    >
                      🚚 Энэ хаягаар хүргүүлэх
                    </button>
                  </div>
                ))}

                <button
                  className="bg-black w-full h-8 rounded-sm text-white flex justify-center items-center"
                  onClick={() => setOpenAddDialog(true)}
                >
                  өөр хаягаар хүргүүлэх
                </button>
              </div>
            ) : (
              <div className="text-center text-sm text-gray-500">
                <div className="text-red-400 mb-5">
                  Бүртгэлтэй хаяг байхгүй байна.
                </div>
                <button
                  className="bg-black w-full h-8 rounded-sm text-white flex justify-center items-center"
                  onClick={() => setOpenAddDialog(true)}
                >
                  хаяг нэмэх
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Address Dialog */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent>
          <AddAddressContent />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserDeliveryDialog;
