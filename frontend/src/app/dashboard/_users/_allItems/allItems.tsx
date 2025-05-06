"use client";

import React, { useState } from "react";
import { UserType } from "@/types";

type Props = {
  users: UserType[];
  searchValue: string;
};

export default function AllItems({ users, searchValue }: Props) {
  // Filter the orders based on searchValue
  const filteredOrders = users.flatMap((user) =>
    user.truckCodeItem
      .filter(
        (item) =>
          item.item &&
          item.item.trackingNumber
            ?.toLowerCase()
            .includes(searchValue.toLowerCase().trim())
      )
      .map((item) => ({
        trackingNumber: item.item!.trackingNumber,
        phoneNumber: user.phoneNumber,
        statusHistory: item.item!.statusHistory || [],
      }))
  );

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Slice the filtered orders based on the current page
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Matching Truck Numbers
      </h3>

      {filteredOrders.length === 0 ? (
        <p className="text-gray-600">No matching tracking numbers found.</p>
      ) : (
        <>
          <div className="space-y-6">
            {currentOrders.map((order, idx) => (
              <div
                key={idx}
                className="border rounded-md p-4 bg-gray-50 hover:bg-gray-100 transition"
              >
                <div className="mb-2">
                  <span className="font-medium text-gray-700">
                    Tracking Number:
                  </span>{" "}
                  {order.trackingNumber}
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Phone:</span>{" "}
                  {order.phoneNumber}
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Status History:
                  </span>
                  {order.statusHistory.length > 0 ? (
                    <ul className="list-disc list-inside mt-1 text-sm text-gray-700">
                      {order.statusHistory.map((status, i) => (
                        <li key={i}>
                          <span className="font-semibold">{status.status}</span>{" "}
                          —{" "}
                          {new Date(status.changedAt).toLocaleString("en-US", {
                            timeZone: "Asia/Ulaanbaatar",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 mt-1">
                      No history available.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

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
        </>
      )}
    </div>
  );
}
