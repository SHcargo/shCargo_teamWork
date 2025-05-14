"use client";

import { useState } from "react";
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

type Order = {
  _id: string;
  trackingNumber: string;
  status: string;
  createdAt: string;
  delivery?:string | null
};

type UserOrderCardProps = {
  order: Order;
  activeCategory: string;
  onRefresh: () => void;
};

export const UserOrderCard = ({
  order,
  activeCategory,
  onRefresh,
}: UserOrderCardProps) => {
  const { _id, trackingNumber, status, createdAt } = order;
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const showTrash =
    ["Бүртгэсэн", "Хаагдсан"].includes(activeCategory) ||
    ["Бүртгэсэн", "Хаагдсан"].includes(status);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/truckItems/${trackingNumber}`
      );
      onRefresh();
    } catch (err) {
      console.error("Устгах үед алдаа гарлаа:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-300 shadow-md mb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-base font-bold text-gray-800 mb-1">
            📦 Захиалгын мэдээлэл {order.delivery ? order.delivery : ""}
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
                <AlertDialogCancel disabled={deleting}>Цуцлах</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={deleting}>
                  {deleting ? "Устгаж байна..." : "Устгах"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <div
        className="text-sm text-gray-700 space-y-1 mb-3 cursor-pointer"
        onClick={() => router.push(`/goodsForUsers/${_id}`)}
      >
        <p>
          <strong>Төлөв:</strong> {status}
        </p>
        <p>
          <strong>Огноо:</strong>{" "}
          {new Date(createdAt).toLocaleDateString("mn-MN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-blue-600 text-xs mt-1">→ Дэлгэрэнгүй харах</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <GetFromCargoDialog trackingNumber={trackingNumber} />
        <UserDeliveryDialog trackingNumber={trackingNumber} />
      </div>
    </div>
  );
};
