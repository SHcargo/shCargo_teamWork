"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";

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
  const [users, setUsers] = useState([]);
  const itemsPerPage = 10;
  const usersFetching = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/adminView`
      );
      setUsers(response.data);
      console.log("Got Users:", response.data);
    } catch (error) {
      console.error("Error submitting tracking number:", error);
    }
  };
  useEffect(() => {
    usersFetching();
  }, []);

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
          {users.map((el, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">1</td>
              <td className="p-2">{el.PhoneNumber}</td>
              <td className="p-2">{el.createdAt}</td>
              <td className="p-2 truncate max-w-[250px]">{el.address}</td>
              <td></td>
              <td className="p-2">{el.status}</td>
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
