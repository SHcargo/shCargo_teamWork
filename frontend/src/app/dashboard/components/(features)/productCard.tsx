"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const mockOrders = Array.from({ length: 32 }, (_, i) => ({
  id: i + 1,
  customer: "test@gamil.com",
  foods: [
    { name: "Sunshine Stackers", quantity: 1 },
    { name: "Sunshine Stackers", quantity: 1 },
  ],
  date: "2024/12/20",
  address:
    "2024/12/СБД, 12-р хороо, СБД нагдсан эмнэлэг Sbd negdsen emneleg...",
  status: i < 3 ? "Pending" : i < 6 ? "Delivered" : "Cancelled",
}));

const statuses = ["Pending", "Delivered", "Cancelled"];

export default function DataTableDemo() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedOrders = mockOrders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Orders</h2>
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
            <th className="p-2">PhoneNumber</th>
            <th className="p-2">items</th>
            <th className="p-2">Date</th>
            <th className="p-2">Delivery Address</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="p-2">1</td>
              <td className="p-2">{order.customer}</td>
              <td className="p-2">
                <details>
                  <summary>{order.foods.length} foods</summary>
                  <ul className="ml-4 mt-2">
                    {order.foods.map((food, index) => (
                      <li key={index}>
                        {food.name} x{food.quantity}
                      </li>
                    ))}
                  </ul>
                </details>
              </td>
              <td className="p-2">{order.date}</td>
              <td className="p-2 truncate max-w-[250px]">{order.address}</td>
              <td className="p-2">
                <Select defaultValue={order.status}>
                  <SelectTrigger
                    className={`w-32 ${
                      order.status === "Pending"
                        ? "border-red-500 text-red-500"
                        : order.status === "Delivered"
                        ? "border-green-500 text-green-500"
                        : "border-gray-500 text-gray-500"
                    }`}
                  >
                    {order.status}
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4 gap-2">
        {[...Array(Math.ceil(mockOrders.length / itemsPerPage))].map(
          (_, idx) => (
            <Button
              key={idx}
              size="sm"
              variant={page === idx + 1 ? "default" : "outline"}
              onClick={() => setPage(idx + 1)}
            >
              {idx + 1}
            </Button>
          )
        )}
      </div>
    </Card>
  );
}
