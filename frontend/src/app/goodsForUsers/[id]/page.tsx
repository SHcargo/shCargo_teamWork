"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "../../providers/UserProvider";
import axios from "axios";

type StatusHistory = {
  status: string;
  changedAt: string;
  _id: string;
};

type GoodsItem = {
  item: string;
  quantity: number;
  _id: string;
};

type Order = {
  _id: string;
  userId: string;
  goodsItems: GoodsItem[];
  status: string;
  createdAt: string;
  statusHistory: StatusHistory[];
};

export const GoodsForUsers = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const value = useUser();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getCargoOrderItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/truckItems/${value.userId}/${id}`
      );
      const data: Order = response.data.order;
      setOrder(data);
    } catch (error) {
      console.error("Error fetching cargo order:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCargoOrderItems();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-200 items-center justify-center">
      <div className="w-full max-w-2xl h-full bg-white px-6 py-4 rounded-md shadow-md flex flex-col gap-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button className="bg-[#5F2DF5] p-2 shadow" onClick={() => router.back()}>
            <ChevronLeft className="text-black" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-800">Захиалгын дэлгэрэнгүй</h1>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        ) : order ? (
          <div className="flex flex-col gap-4">
            {/* Main Order Info */}
            <div className="flex gap-6 items-start">
              <img
                src="/placeholder.jpg"
                alt="Cargo image"
                className="w-48 h-48 object-cover bg-gray-100 rounded-md shadow"
              />
              <div className="flex flex-col gap-2 text-gray-700">
                <p><span className="font-semibold">Бараа:</span> {order.goodsItems[0].item}</p>
                <p><span className="font-semibold">Тоо ширхэг:</span> {order.goodsItems[0].quantity}</p>
                <p><span className="font-semibold">Статус:</span> {order.status}</p>
                <p><span className="font-semibold">Огноо:</span> {new Date(order.createdAt).toLocaleString()}</p>
              </div>
            </div>

            {/* Status History */}
            <div className="mt-4">
              <h2 className="text-lg font-medium text-blue-600 mb-2">Статусын түүх</h2>
              <div className="flex flex-col gap-2">
                {order.statusHistory.map((entry) => (
                  <div key={entry._id} className="text-sm text-gray-600">
                    <span className="font-medium">{entry.status}</span> —{" "}
                    <span className="text-red-400">{new Date(entry.changedAt).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">Захиалга олдсонгүй.</p>
        )}
      </div>
    </div>
  );
};

export default GoodsForUsers;