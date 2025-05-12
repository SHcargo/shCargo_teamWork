"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import SkeletonTable from "./skeleton";
import DataTable from "./dataTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input"; // Assuming you have a styled Input component
import AllItems from "../../_users/_allItems/allItems";

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
    item: OrderItem | null; // Handle null item
    status: string;
  }[];
  date?: string;
  address?: string;
  status?: string;
};

type Props = {
  searchValue: string;
  setSearchValue: (val: string) => void;
};

export default function MainDataTable({ searchValue, setSearchValue }: Props) {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("users");

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

  const filteredUsers = users.filter((user) => {
    const term = searchValue.toLowerCase();
    if (filterType === "users") {
      return user.phoneNumber.toLowerCase().includes(term);
    }
    if (filterType === "truck") {
      return user.truckCodeItem.some((truck) =>
        truck.item && truck.item.trackingNumber
          ? truck.item.trackingNumber.toLowerCase().includes(term)
          : false
      );
    }
    return true;
  });

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <h2 className="text-xl font-semibold">Users and Orders</h2>
        <div className="flex gap-2 items-center">
          <Input
            type="text"
            placeholder={`Search by ${filterType}`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-[200px]"
          />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="users">Users</SelectItem>
              <SelectItem value="truck">truck number</SelectItem>
            </SelectContent>
          </Select>
          <button
            onClick={() => {
              setSearchValue("");
              setFilterType("users");
            }}
            className="text-sm text-blue-600 underline"
          >
            Reset
          </button>
        </div>
      </div>
      {filterType === "truck" && (
        <div className="w-full mt-4">
          <AllItems users={filteredUsers} searchValue={searchValue} />
        </div>
      )}
      {loading ? <SkeletonTable /> : <DataTable users={filteredUsers} />}
    </Card>
  );
}
