import { useDeliveryAddress } from "@/app/providers/DeliveryAddressProvider";
import { useUser } from "@/app/providers/UserProvider";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";

export const DeleteConfirm = ({
  selectedAddress,
}: {
  selectedAddress: string;
}) => {
  const { userId } = useUser();
  const { fetchAddresses } = useDeliveryAddress();
  const handleDeleteButton = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/deliveryAddress/${userId}/${selectedAddress}`
      );
      fetchAddresses();
      console.log("Delivery address deleted successfully", response.data);
    } catch (error) {
      console.log("Error in creating delivery address", error);
    }
  };
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Хаяг устгах</DialogTitle>
        <DialogDescription>
          Энэхүү хаягийг устгахдаа та итгэлтэй байна уу
        </DialogDescription>
      </DialogHeader>
      <div className="flex justify-center gap-4">
        <DialogClose asChild>
          <Button
            type="button"
            className="bg-red-500"
            onClick={handleDeleteButton}
          >
            Тийм
          </Button>
        </DialogClose>

        <DialogClose asChild>
          <Button className="bg-white text-black border">Үгүй</Button>
        </DialogClose>
      </div>
    </DialogContent>
  );
};
