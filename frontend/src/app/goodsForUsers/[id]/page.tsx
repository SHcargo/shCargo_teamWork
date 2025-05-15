/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
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
import UserDeliveryDialog from "@/app/components/UserDeliveryDialog";
import GetFromCargoDialog from "@/app/components/GetFromCargoDialog";

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
  delivery?: string | null;
  deliveryAddressId?: string; // энэ property-г нэмсэн гэж үзсэн
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

const GoodsForUsersDetail = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const value = useUser();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);

  const getCargoOrderItems = useCallback(async () => {
    if (!value.userId || !id) return;
    setLoading(true);
    setError(null);

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
  }, [id, value.userId]);

  const getAddress = useCallback(async () => {
    if (!order?.trackingNumber) return;
    try {
      const checkResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/choosePickupOrDelivery/${order.trackingNumber}`
      );
      const data = checkResponse.data?.address;

      // Ensure data is an array or fallback to empty array
      if (Array.isArray(data)) {
        setAddresses(data);
      } else if (data) {
        setAddresses([data]);
      } else {
        setAddresses([]);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddresses([]); // fallback to prevent map error
    }
  }, [order?.trackingNumber]);

  useEffect(() => {
    getCargoOrderItems();
  }, [getCargoOrderItems]);

  useEffect(() => {
    if (order?.trackingNumber) {
      getAddress();
    }
  }, [order?.trackingNumber, getAddress]);


  return (
    <div className="w-screen h-screen flex flex-col bg-gray-200 items-center">
      <div className="w-full max-w-2xl h-screen bg-white px-4 sm:px-6 py-4 rounded-md shadow-md flex flex-col gap-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            className="bg-gray-300 w-15 p-2 shadow rounded-sm cursor-pointer"
            onClick={() => router.back()}
          >
            <ChevronLeft stroke="black" className="text-black" />
          </Button>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Захиалгын дэлгэрэнгүй
          </h1>
        </div>

        {/* Loading / Error / Order */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-700"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : order ? (
          <div className="flex flex-col gap-4">
            {/* Order Info */}
            <div className="flex flex-col sm:flex-row gap-6 items-start border rounded-sm border-gray-300 p-4 bg-white shadow-md">
              <AlertDialog>
                <AlertDialogTrigger className="w-full sm:w-32">
                  {order.image ? (
                    <img
                      src={order.image}
                      alt={`Order image ${order.trackingNumber || ""}`}
                      className="w-full sm:w-32 sm:h-32 object-cover rounded-md cursor-pointer"
                    />
                  ) : (
                    <div className="w-full sm:w-32 sm:h-32 flex items-center justify-center bg-gray-200 rounded-md">
                      <p className="text-gray-600">Зураг байхгүй</p>
                    </div>
                  )}
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Зураг</AlertDialogTitle>
                    <AlertDialogDescription className="flex justify-center">
                      {order.image ? (
                        <img
                          src={order.image}
                          alt={`Order image ${order.trackingNumber || ""}`}
                          className="max-w-full max-h-[60vh] object-contain rounded-md"
                        />
                      ) : (
                        <p className="text-center text-gray-600">
                          Зураг байхгүй
                        </p>
                      )}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Гарах</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <div className="flex flex-col gap-2 text-black">
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
            <div className="mt-4 border rounded-sm border-gray-300 p-4 bg-white shadow-md">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                Truck Number:{" "}
                <span className="font-medium text-black">
                  {order.trackingNumber}
                </span>
              </h2>
              <h2 className="text-lg font-medium text-black mt-2 mb-4">
                Статусын түүх
              </h2>
              {order.statusHistory?.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {order.statusHistory.map((entry) => (
                    <div
                      key={entry._id}
                      className="text-sm text-gray-700 flex justify-between items-center"
                    >
                      <span className="font-medium text-black">
                        {entry.status}
                      </span>
                      <span className="text-black text-sm">
                        {new Date(entry.changedAt).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Статусын түүх байхгүй.</p>
              )}
            </div>

            {/* Delivery Section */}
            {order.delivery ? (
              <div className="w-full">
                <div className="mb-2">
                  ({order.delivery} хаяг)
                </div>
                <div>
                  {order.delivery === "Хүргүүлэх" ? (
                    <div className="space-y-4">
                      {addresses.length > 0 ? (
                        addresses.map((address) => (
                          <div
                            key={address._id}
                            className="p-4 border border-gray-200 rounded-xl shadow-sm bg-gray-50 flex flex-col gap-4"
                          >
                            <div className="text-sm font-semibold text-gray-800">
                              {address.detail ||
                                "Хаягийн дэлгэрэнгүй мэдээлэл байхгүй"}
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
                <GetFromCargoDialog
                  trackingNumber={order.trackingNumber as string}
                  ref={getAddress}
                />
                <UserDeliveryDialog
                  trackingNumber={order.trackingNumber as string}
                  ref={getAddress}
                />
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GoodsForUsersDetail;
