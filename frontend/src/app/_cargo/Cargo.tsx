/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import { useUser } from "../providers/UserProvider";
import Post from "../components/post";
import axios from "axios";
import { UserOrderCard } from "../components/userOrderCard";

type Order = {
  _id: string;
  userId: string;
  status: string;
  createdAt: string;
  trackingNumber:string;
  statusHistory: {
    status: string;
    changedAt: string;
    _id: string;
  }[];
  __v: number;
};

const categories: string[] = [
  "Бүгд",
  "Бүртгэсэн",
  "Замдаа",
  "УБ-д ирсэн",
  "Хаагдсан",
];

const Cargo = () => {
  const value = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("Бүгд");
  const [loading, setLoading] = useState<boolean>(false);
  const [deliveryCounts, setDeliveryCounts] = useState<Record<string, number>>({
    Бүгд: 0,
    Бүртгэсэн: 0,
    Замдаа: 0,
    "УБ-д ирсэн": 0,
    Хаагдсан: 0,
  });
  const getCargoOrderItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/truckItems/${value.userId}`
      );
      const data: Order[] = response.data.orders;

      setOrders(data);
      const counts: Record<string, number> = categories.reduce(
        (acc, category) => {
          if (category === "Бүгд") {
            acc[category] = data.length;
          } else {
            acc[category] = data.filter(
              (order) => order.status === category
            ).length;
          }
          return acc;
        },
        {} as Record<string, number>
      );

      setDeliveryCounts(counts);
    } catch (error) {
      console.error("Error fetching cargo orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCargoOrderItems();
  }, [value.userId]);

  const filteredOrders =
    activeCategory === "Бүгд"
      ? orders
      : orders.filter((order) => order.status === activeCategory);
console.log(filteredOrders)
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-2xl mx-auto p-4 bg-white overflow-hidden">
      <div className="flex-shrink-0">
        <Post refreshFn={getCargoOrderItems} loading={loading} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="mt-4 flex gap-2 w-full overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`min-h-12 px-8 rounded-lg text-xs transition-all cursor-pointer ${
                  activeCategory === category
                    ? "bg-[#5F2DF5] text-white"
                    : "bg-gray-100 text-[#5F2DF5]"
                }`}
              >
                {category} ({deliveryCounts[category] ?? 0})
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto mt-4 bg-gray-50 rounded-xl p-2 shadow-inner mb-4">
            {filteredOrders.length === 0 ? (
              <p className="text-center text-gray-500">
                No orders found for this category.
              </p>
            ) : (
              filteredOrders.map((order) => (
                <div key={order._id}>
                  <UserOrderCard
                    description={`Order Status: ${order.status}`}
                    id={order._id}
                    statusHistory={order.statusHistory}
                    trackingNumber={order.trackingNumber}
                  />
                </div>
              ))
            )}
            <div className="h-10"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cargo;

/* {order.goodsItems.map((item) => (
  <div key={item._id} className="flex flex-row justify-between">
    <span>{item.item}</span>
    <span>{item.quantity}</span>
  </div>
))} */
