/* eslint-disable @next/next/no-img-element */
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { useUser } from "../providers/UserProvider";

type UserDeliveryDialogProps = {
  trackingNumber: string;
};

const GetFromCargoDialog = ({ trackingNumber }: UserDeliveryDialogProps) => {
  const value = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const choosePickupOrDelivery = async () => {
    if (!value?.userId || !value?.phoneNumber) {
      toast.error("❌ Хэрэглэгчийн мэдээлэл дутуу байна.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/choosePickupOrDelivery/${trackingNumber}`
      );

      if (response.data.success === false) {
        toast.error("❌ Энэ хэрэглэгч аль хэдийн хаяг сонгосон байна.");
        return;
      }

      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/choosePickupOrDelivery/${value.userId}`,
        {
          status: "Салбараас авах",
          phoneNumber: value.phoneNumber,
          trackingNumber: trackingNumber,
        }
      );

      toast.success("✅ Хаяг амжилттай илгээгдлээ!");
    } catch (error) {
      toast.error("❌ Хаяг илгээхэд алдаа гарлаа!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full h-10 text-sm cursor-pointer border border-gray-300/60 font-medium rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-300 transition-colors">
          📍 Хаяг сонгох
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Хаяг мэдээлэл</DialogTitle>
          <DialogDescription>
            Доорх хаяг дээр очиж ачаагаа авна уу.
          </DialogDescription>
        </DialogHeader>

        <div className="w-fit px-2">
          <a
            href="https://www.google.com/maps?q=47.9145,106.9225"
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-4 items-start"
          >
            <img
              src="/img.JPG"
              alt="Google Maps"
              className="h-40 w-40 rounded-md object-cover"
            />
            <div className="text-black text-sm max-w-xs">
              СБД Цирк-н баруун талд, миний дэлгүүрийн чанх хойно, 10-р байр.
              <div className="text-blue-600 underline mt-2">
                map дээр харах →
              </div>
            </div>
          </a>

          <button
            onClick={choosePickupOrDelivery}
            disabled={isLoading}
            className={`mt-4 w-full h-10 text-sm font-medium rounded-lg transition-colors ${
              isLoading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-100 text-gray-800 hover:bg-gray-300 cursor-pointer"
            }`}
          >
            {isLoading ? "Илгээж байна..." : "🏢 Салбараас авах"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GetFromCargoDialog;
