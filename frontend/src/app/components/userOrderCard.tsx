import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GetFromCargoDialog from "./GetFromCargoDialog";
import UserDeliveryDialog from "./UserDeliveryDialog";

type UserOrderCardProps = {
  description: string;
  trackingNumber: string;
  id: string;
  activeCategory: string;
  createdAt: string;
  ref: () => void;
};

export const UserOrderCard = ({
  description,
  id,
  trackingNumber,
  activeCategory,
  createdAt,
  ref,
}: UserOrderCardProps) => {
  const router = useRouter();

  const showTrash =
    ["Бүртгэсэн", "Хаагдсан"].includes(activeCategory) ||
    ["Бүртгэсэн", "Хаагдсан"].includes(description);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/truckItems/${trackingNumber}`
      );
      ref();
    } catch (err) {
      console.error("Устгах үед алдаа гарлаа:", err);
    }
  };

  console.log(trackingNumber);

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-300 shadow-md mb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-base font-bold text-gray-800 mb-1">
            📦 Захиалгын мэдээлэл
          </h2>
          <p className="text-sm text-gray-600"># {trackingNumber}</p>
        </div>
        {showTrash && (
          <AlertDialog>
            <AlertDialogTrigger title="Устгах">
              <Trash2
                stroke="red"
                className="h-8 w-8 p-1 border rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer"
              />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Устгах уу?</AlertDialogTitle>
                <AlertDialogDescription>
                  Ачааны дугаар: {trackingNumber}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Цуцлах</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Устгах
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <div
        className="text-sm text-gray-700 space-y-1 mb-3 cursor-pointer"
        onClick={() => router.push(`/goodsForUsers/${id}`)}
      >
        <p>
          <strong>Төлөв:</strong> {description}
        </p>
        <p>
          <strong>Огноо:</strong>{" "}
          {new Date(createdAt).toLocaleDateString("mn-MN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-blue-600 text-xs mt-1 cursor-pointer">
          → Дэлгэрэнгүй харах
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <GetFromCargoDialog />
        <UserDeliveryDialog />
      </div>
    </div>
  );
};
