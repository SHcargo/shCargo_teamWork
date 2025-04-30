"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import SkeletonTable from "./skeleton";
import DataTable from "./dataTable";

type OrderItem = {
  trackingNumber: string;
  status: string;
  imageUrl?: string;
  statusHistory?: { status: string; changedAt: string }[];
};

type UserType = {
  phoneNumber: string;
  createdAt: string;
  truckCodeItem: {
    item: OrderItem;
    status: string;
  }[];
  date?: string;
  address?: string;
  status?: string;
};
type Props = {
  searchValue: string;
};

export default function MainDataTable({ searchValue }: Props) {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
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
    fetchUsers();
  }, []);
  const filteredUsers = users.filter((user) =>
    user.phoneNumber.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Users and Orders</h2>
      </div>
      {loading ? <SkeletonTable /> : <DataTable users={filteredUsers} />}
    </Card>
  );
}
