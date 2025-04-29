"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type OrderType = {
  img: string;
  ordernumber: string;
  status: string;
};

type UserType = {
  name: string;
  number: string;
  orders: OrderType[];
};

export default function DataTableDemo() {
  const [users, setUsers] = useState<UserType[]>([
    {
      name: "John Doe",
      number: "123456789",
      orders: [
        { img: "img1.jpg", ordernumber: "001", status: "Shipped" },
        { img: "img2.jpg", ordernumber: "002", status: "Pending" },
      ],
    },
    {
      name: "Jane Smith",
      number: "987654321",
      orders: [
        { img: "img3.jpg", ordernumber: "003", status: "Delivered" },
        { img: "img4.jpg", ordernumber: "004", status: "Shipped" },
        { img: "img5.jpg", ordernumber: "005", status: "Pending" },
      ],
    },
  ]);

  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Users and Orders</h2>
      </div>

      {/* Table 1: Users */}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">Name</th>
            <th className="p-2">Phone Number</th>
            <th className="p-2">Orders</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <React.Fragment key={index}>
              <tr
                className="border-b cursor-pointer hover:bg-gray-50"
                onClick={() => toggleExpand(index)}
              >
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.number}</td>
                <td className="p-2">{user.orders.length}</td>
                <td className="p-2">
                  <button className="text-blue-500">Expand</button>
                </td>
              </tr>

              {/* Table 2: Expanded Orders */}
              {expandedRow === index && (
                <tr className="bg-gray-50">
                  <td colSpan={4} className="p-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr>
                          <th className="p-2">Order Number</th>
                          <th className="p-2">Status</th>
                          <th className="p-2">Image</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.orders.map((order, orderIndex) => (
                          <tr key={orderIndex}>
                            <td className="p-2">{order.ordernumber}</td>
                            <td className="p-2">{order.status}</td>
                            <td className="p-2">
                              <img
                                src={order.img}
                                alt={`Order ${order.ordernumber}`}
                                className="w-12 h-12"
                              />
                            </td>
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
