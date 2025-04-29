"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";

type OrderItem = {
  trackingNumber: string;
  status: string;
  imageUrl?: string;
};

type UserType = {
  phoneNumber: string;
  truckCodeItem: {
    item: OrderItem;
    status: string;
  }[];
  date?: string;
  address?: string;
  status?: string;
};

export default function DataTableDemo() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const usersFetching = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/adminView`
      );
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    usersFetching();
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Users and Orders</h2>
        <input
          type="text"
          placeholder="13 June 2023 - 14 July 2023"
          className="border p-2 rounded"
          disabled
        />
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">№</th>
            <th className="p-2">Phone Number</th>
            <th className="p-2">Items</th>
            <th className="p-2">Date</th>
            <th className="p-2">Delivery Address</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">
                    <Skeleton width={20} />
                  </td>
                  <td className="p-2">
                    <Skeleton width={100} />
                  </td>
                  <td className="p-2">
                    <Skeleton count={2} />
                  </td>
                  <td className="p-2">
                    <Skeleton width={90} />
                  </td>
                  <td className="p-2">
                    <Skeleton width={120} />
                  </td>
                  <td className="p-2">
                    <Skeleton width={80} />
                  </td>
                </tr>
              ))
            : users.map((user, index) => (
                <React.Fragment key={index}>
                  <tr
                    className="border-b cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleExpand(index)}
                  >
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{user.phoneNumber || "-"}</td>
                    <td className="p-2">
                      {user.truckCodeItem?.length
                        ? `${user.truckCodeItem.length} бараа`
                        : "-"}
                    </td>
                    <td className="p-2">
                      {user.date
                        ? new Date(user.date).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="p-2">{user.address || "-"}</td>
                    <td className="p-2">{user.status || "-"}</td>
                  </tr>

                  {expandedRow === index && user.truckCodeItem.length > 0 && (
                    <tr className="bg-gray-50">
                      <td colSpan={6} className="p-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-left border-b">
                              <th className="p-2">№</th>
                              <th className="p-2">Tracking Number</th>
                              <th className="p-2">Status</th>
                              <th className="p-2">Date</th>
                              <th className="p-2">Image</th>
                              <th className="p-2">Лангуу</th>
                            </tr>
                          </thead>
                          <tbody>
                            {user.truckCodeItem.map((order, idx) => (
                              <tr key={idx}>
                                <td className="p-2">{idx + 1}</td>
                                <td className="p-2">
                                  {order.item.trackingNumber}
                                </td>
                                <td className="p-2">{order.item.status}</td>
                                <td className="p-2">
                                  {order.item.statusHistory[0].changedAt}
                                </td>
                                <td className="p-2">
                                  <img
                                    src={
                                      order.item.imageUrl ||
                                      "/placeholder-image.png"
                                    }
                                    alt={`Order ${order.item.trackingNumber}`}
                                    className="w-12 h-12 object-cover rounded-md"
                                  />
                                </td>
                                <td className="p-2">2-3</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
        </tbody>
      </table>
    </Card>
  );
}
