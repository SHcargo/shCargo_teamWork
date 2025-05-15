/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
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
  delivery?: string | null;
};
type DeliveryAddress = {
  _id: string;
  lat: number;
  lng: number;
  detail: string;
  district: string;
  khoroo: string;
  accuracy: number;
  userId: string;
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
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);

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

  const getAddress = async () => {
    try {
      const checkResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/choosePickupOrDelivery/${trackingNumber}`
      );
      const data = checkResponse.data?.address;

      // Ensure data is an array or fallback to empty array
      if (Array.isArray(data)) {
        setAddresses(data);
      } else if (data) {
        // Handle single object response (some APIs return a single object instead of an array)
        setAddresses([data]);
      } else {
        setAddresses([]);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddresses([]); // fallback to prevent map error
    }
  };

  useEffect(() => {
    getAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                <AlertDialogCancel disabled={deleting}>
                  Цуцлах
                </AlertDialogCancel>
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

      {order.delivery ? (
        <div className="w-full">
          <div className="mb-2">
            {" "}
            ({order.delivery} хаяг)
          </div>
          <div>
            {order.delivery === "Хүргүүлэх" ? (
              <div className="space-y-4">
                {Array.isArray(addresses) && addresses.length > 0 ? (
                  addresses.map((address) => (
                    <div
                      key={address._id}
                      className="p-4 border border-gray-200 rounded-xl shadow-sm bg-gray-50 flex flex-col gap-4"
                    >
                      <div className="text-sm font-semibold text-gray-800">
                        {address.detail || "Хаягийн дэлгэрэнгүй мэдээлэл байхгүй"}
                      </div>

                      <div className="text-sm text-gray-600 space-y-1 flex gap-5">
                        <div className="flex">
                          <span className="font-medium">Дүүрэг: </span>
                          <span>{address.district}</span>
                        </div>
                        <div className="flex">
                          <span className="font-medium">Хороо: </span>
                          <span>{address.khoroo}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    Хаягийн мэдээлэл олдсонгүй.
                  </p>
                )}
              </div>
            ) : (
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
                    className="h-30 w-30 rounded-md object-cover"
                  />
                  <div className="text-black text-sm max-w-xs">
                    СБД Цирк-н баруун талд, миний дэлгүүрийн чанх хойно, 10-р
                    байр.
                    <div className="text-blue-600 underline mt-2">
                      map дээр харах →
                    </div>
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <GetFromCargoDialog trackingNumber={trackingNumber} ref={onRefresh} />
          <UserDeliveryDialog trackingNumber={trackingNumber} ref={onRefresh} />
        </div>
      )}
    </div>
  );
};
