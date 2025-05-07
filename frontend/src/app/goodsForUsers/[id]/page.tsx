/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "../../providers/UserProvider";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type StatusHistory = {
  status: string;
  changedAt: string;
  _id: string;
};

type Order = {
  _id: string;
  userId: string;
  status: string;
  createdAt: string;
  statusHistory: StatusHistory[];
  image?: string;
  trackingNumber?: string;
};

const GoodsForUsersDetail = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const value = useUser();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getCargoOrderItems = async () => {
    setLoading(true);
    setError(null);
    if (!value.userId || !id) return;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/truckItems/${value.userId}/${id}`
      );
      const data: Order = response.data.order;
      setOrder(data);
    } catch (error) {
      console.error("Error fetching cargo order:", error);
      setError("Захиалгыг ачаалах үед алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCargoOrderItems();
  }, [id, value.userId]);

  return (
    <div className="w-screen h-screen flex flex-col bg-[#dddddd] items-center">
      <div className="w-full max-w-2xl h-screen bg-white px-4 sm:px-6 py-4 rounded-md shadow-md flex flex-col gap-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            className="bg-gray-300 p-2 shadow"
            onClick={() => router.back()}
          >
            <ChevronLeft stroke="black" className="text-black" />
          </Button>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Захиалгын дэлгэрэнгүй
          </h1>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : order ? (
          <div className="flex flex-col gap-4">
            {/* Main Order Info */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Image Dialog */}
              <AlertDialog>
                <AlertDialogTrigger className="w-full sm:w-32 flex justify-center sm:justify-start mt-2">
                  <img
                    src={order.image || "/default-image.jpg"}
                    alt={`Order image${order.trackingNumber ? ` ${order.trackingNumber}` : ""}`}
                    className="w-full sm:w-32 sm:h-32 object-cover rounded-md cursor-pointer"
                  />
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Зураг</AlertDialogTitle>
                    <AlertDialogDescription className="flex justify-center">
                      <img
                        src={order.image || "/default-image.jpg"}
                        alt={`Order image${order.trackingNumber ? ` ${order.trackingNumber}` : ""}`}
                        className="max-w-full max-h-[60vh] object-contain rounded-md"
                      />
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Гарах</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* Order Info */}
              <div className="flex flex-col gap-2 text-gray-700">
                <p>
                  <span className="font-semibold">Статус:</span> {order.status}
                </p>
                <p>
                  <span className="font-semibold">Огноо:</span>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Status History */}
            <div className="mt-4">
              <h2 className="text-base sm:text-lg">
                Truck Number: <span className="font-medium">{order.trackingNumber}</span>
              </h2>
              <h2 className="text-lg font-medium text-blue-600 mb-2">
                Статусын түүх
              </h2>
              {order.statusHistory?.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {order.statusHistory.map((entry) => (
                    <div key={entry._id} className="text-sm text-gray-600">
                      <span className="font-medium">{entry.status}</span> —{" "}
                      <span className="text-red-400">
                        {new Date(entry.changedAt).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Статусын түүх байхгүй.</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">Захиалга олдсонгүй.</p>
        )}
      </div>
      </div>
  );
};

export default GoodsForUsersDetail;
