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
import { useUser } from "../providers/UserProvider"; // Ensure you import useUser hook
type UserDeliveryDialogProps = {
  trackingNumber: string;
};
const GetFromCargoDialog = ({trackingNumber} : UserDeliveryDialogProps) => {
  const value = useUser(); // Fetch user data

  const choosePickupOrDelivery = async () => {
    try {
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
          trackingNumber: trackingNumber
        }
      );
      toast.success("✅ Хаяг амжилттай илгээгдлээ!");
    } catch (error) {
      toast.error("❌ Хаяг илгээхэд алдаа гарлаа!");
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full h-10 text-sm cursor-pointer font-medium rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-300 transition-colors">
          🏢 Салбараас авах
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>хаяг </DialogTitle>
          <DialogDescription>
            <a
              href="https://www.google.com/maps?q=47.9145,106.9225"
              target="_blank" // Open in new tab
              className="flex gap-4 h-fit w-fit"
            >
              <img
                src="img.JPG"
                alt="Google Maps"
                className="h-40 rounded-md object-cover"
              />
              <div>
                <p className="text-black text-sm">
                  СБД Цирк-н баруун талд, миний дэлгүүрийн чанх хойно, 10-р
                  байр.
                </p>
                <span className="text-blue cursor-pointer">map-ааас харах</span>
              </div>
            </a>

            {/* The button will trigger the pickup or delivery choice */}
            <button
              onClick={choosePickupOrDelivery}
              className="w-full h-10 text-sm cursor-pointer font-medium rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-300 transition-colors"
            >
              🏢 Салбараас авах
            </button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GetFromCargoDialog;
