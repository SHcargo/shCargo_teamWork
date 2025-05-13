"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import SkeletonTable from "../components/(features)/skeleton";

type DeliveryItem = {
  _id: string;
  trackingNumber: string;
  phoneNumber: string;
  status: string;
  userId: string;
  deliveryAddress: {
    accuracy: number;
    detail: string;
    district: string;
    khoroo: string;
    lat?: number;
    lng?: number;
  };
};

export const Delivery = () => {
  const [deliveries, setDeliveries] = useState<DeliveryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  const getDeliveryData = async () => {
    try {
      const response = await axios.get<DeliveryItem[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/choosePickupOrDelivery/`
      );
      setDeliveries(response.data);
    } catch (error) {
      console.error("Failed to fetch delivery data:", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  useEffect(() => {
    getDeliveryData();
  }, []);

  return (
    <div className="max-full mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Delivery Orders
      </h1>

      {loading ? (
        <SkeletonTable />
      ) : deliveries.length === 0 ? (
        <p className="text-gray-500">No deliveries found.</p>
      ) : (
        deliveries.map((delivery) => (
          <div
            key={delivery._id}
            className="border rounded-lg p-6 mb-4 bg-white shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <p className="text-lg font-medium text-gray-800">
                  <strong>Tracking Number:</strong> {delivery.trackingNumber}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Status:</strong> {delivery.status}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">
                  <strong>Phone:</strong> {delivery.phoneNumber}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Detail:</strong> {delivery.deliveryAddress?.detail}
                </p>
              </div>
              {/* Address Section */}
              {delivery.deliveryAddress.lat && delivery.deliveryAddress.lng ? (
                <div className="mt-2">
                  <a
                    href={`https://www.google.com/maps?q=${delivery.deliveryAddress.lat},${delivery.deliveryAddress.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    📍 View on Google Maps
                  </a>
                </div>
              ) : (
                <div className="text-sm text-gray-600 mt-2 space-y-1">
                  <p>
                    <strong>Дүүрэг:</strong> {delivery.deliveryAddress.district}
                  </p>
                  <p>
                    <strong>Хороо:</strong> {delivery.deliveryAddress.khoroo}
                  </p>
                  <p>
                    <strong>Тодорхой байдал (accuracy):</strong> {delivery.deliveryAddress.accuracy}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
