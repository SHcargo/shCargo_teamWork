import { useDeliveryAddress } from "../providers/DeliveryAddressProvider";
import { useUser } from "../providers/UserProvider";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LeafletMap from "../_profile/_components/LeafletMap";

type DeliveryAddress = {
  accuracy: number;
  lng: number;
  lat: number;
  _id: string;
  city: string;
  district: string;
  khoroo: string;
  detail: string; // Ensure this is a string in your type
  userId: string;
};

type UserDeliveryDialogProps = {
  trackingNumber: string;
};

const UserDeliveryDialog = ({ trackingNumber }: UserDeliveryDialogProps) => {
  const { userId, phoneNumber } = useUser();
  const { addresses } = useDeliveryAddress();

  const choosePickupOrDelivery = async (address: DeliveryAddress, trackingNumber: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/choosePickupOrDelivery/${trackingNumber}`
      );

      if (response.data.success === false) {
        toast.error("❌ Энэ хэрэглэгч аль хэдийн хаяг сонгосон байна.");
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
          phoneNumber: phoneNumber,
          trackingNumber: trackingNumber,
        }
      );
      toast.success("✅ Хаяг амжилттай илгээгдлээ!");
    } catch (error) {
      toast.error("❌ Хаяг илгээхэд алдаа гарлаа!");
      console.error("Error:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full h-10 text-sm font-medium rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-300 transition-colors">
          🚚 Хүргүүлэх
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Таний хаяг</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-4 mt-4">
              {addresses && addresses.length > 0 ? (
                addresses.map((address) => (
                  <div
                    key={address._id}
                    className="p-4 border border-gray-200 rounded-xl shadow-sm bg-gray-50 flex flex-col gap-4"
                  >
                    {address?.detail ? (
                      <div className="text-sm font-semibold text-gray-800">
                        {address.detail}
                      </div>
                    ) : (
                      <p>Address detail not available</p>
                    )}

                    {address.accuracy < 100 ? (
                      <LeafletMap
                        latitude={address.lat}
                        longitude={address.lng}
                      />
                    ) : (
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
                    )}

                    <button
                      className="w-full h-10 text-sm font-medium border rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-300 transition-colors"
                      onClick={() =>
                        choosePickupOrDelivery(address, trackingNumber)
                      }
                    >
                      🚚 Энэ хаягаар хүргүүлэх
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center text-sm text-gray-500">
                  Бүртгэлтэй хаяг байхгүй байна.
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UserDeliveryDialog;
