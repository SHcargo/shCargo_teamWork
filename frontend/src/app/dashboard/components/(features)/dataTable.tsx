import { Button } from "@/components/ui/button";
import React, { useState } from "react";
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
    item: OrderItem | null;
    status: string;
  }[];
  date?: string;
  address?: string;
  status?: string;
};

type Props = {
  users: UserType[];
};

export default function DataTable({ users }: Props) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const toggleExpand = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  // Date filtering function
  const filterByDate = (statusHistory: { changedAt: string }[]) => {
    if (!startDate && !endDate) return true; // No date filter applied

    return statusHistory.some((status) => {
      const changedAtDate = new Date(status.changedAt);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const afterStart = start ? changedAtDate >= start : true;
      const beforeEnd = end ? changedAtDate <= end : true;

      return afterStart && beforeEnd;
    });
  };

  // Pagination logic: Show all users, including those without items
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Slice users based on current page
  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Go to next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {/* Date Filter Inputs */}
      <div className="flex justify-between">
        <div className="flex gap-2 mb-4">
          <input
            type="date"
            className="border p-2 rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span>—</span>
          <input
            type="date"
            className="border p-2 rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">№</th>
            <th className="p-2">Phone Number</th>
            <th className="p-2">Items</th>
            <th className="p-2">Date</th>
            <th className="p-2">Delivery Address</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user, index) => (
            <React.Fragment key={index}>
              <tr
                className="border-b cursor-pointer hover:bg-gray-50"
                onClick={() => toggleExpand(index)}
              >
                <td className="p-2">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="p-2">{user.phoneNumber || "-"}</td>
                <td className="p-2">
                  {user.truckCodeItem?.length
                    ? `${user.truckCodeItem.length} бараа`
                    : "-"}
                </td>
                <td className="p-2">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "-"}
                </td>
                <td className="p-2">{user.address || "-"}</td>
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
                        {user.truckCodeItem
                          .filter((order) =>
                            filterByDate(order.item?.statusHistory || [])
                          )
                          .map((order, idx) => (
                            <tr key={idx}>
                              <td className="p-2">{idx + 1}</td>
                              <td className="p-2">
                                {order.item?.trackingNumber || "-"}
                              </td>
                              <td className="p-2">
                                {order.item?.statusHistory?.map((el, index) => (
                                  <div key={index}>{el.status}</div>
                                ))}
                              </td>
                              <td className="p-2">
                                {order.item?.statusHistory?.map((el, idx) => (
                                  <div key={idx}>
                                    {new Date(el.changedAt).toLocaleString(
                                      "en-US",
                                      {
                                        timeZone: "Asia/Ulaanbaatar",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      }
                                    )}
                                  </div>
                                ))}
                              </td>
                              <td className="p-2">
                                {/* <img
                                  src={
                                    order.item.imageUrl ||
                                    "/placeholder-image.png"
                                  }
                                  alt={`Order ${order.item.trackingNumber}`}
                                  className="w-12 h-12 object-cover rounded-md"
                                /> */}
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

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={goToPreviousPage}
          className="px-4 py-2 bg-gray-500 text-white rounded-md disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          className="px-4 py-2 bg-gray-500 text-white rounded-md disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
