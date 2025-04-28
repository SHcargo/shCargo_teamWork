"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

export default function DataTableDemo() {
  const [users, setUsers] = useState<any[]>([]);

  const usersFetching = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/adminView`
      );
      console.log("Got Users:", response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    usersFetching();
  }, []);

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
          {users?.map((el, index) => (
            <tr key={index}>
              <td className="p-2">{index + 1}</td>
              {/* Display the row number */}
              <td className="p-2">{el.phoneNumber}</td>
              {/* <td className="p-2">{el.items}</td>{" "} */}
              {/* Assuming 'items' exists */}
              <td className="p-2">{el.date}</td> {/* Assuming 'date' exists */}
              <td className="p-2">{el.address}</td>
              <td className="p-2">{el.status}</td>{" "}
              {/* Assuming 'status' exists */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4 gap-2"></div>
    </Card>
  );
}
