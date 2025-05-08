/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useUser } from "../providers/UserProvider";
import axios from "axios";
import { UserOrderCard } from "../components/userOrderCard";

type Order = {
  _id: string;
  userId: string;
  status: string;
  createdAt: string;
  trackingNumber: string;
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
    if (!value.userId) return;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/truckItems/${value.userId}`
      );
      const data: Order[] = response.data.orders;
      setOrders(data);

      const counts: Record<string, number> = categories.reduce((acc, category) => {
        acc[category] =
          category === "Бүгд"
            ? data.length
            : data.filter((order) => order.status === category).length;
        return acc;
      }, {} as Record<string, number>);
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

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full max-w-2xl mx-auto p-4 bg-white overflow-hidden">
      {/* БАЙРШИЛ ХЭСЭГ */}
      <div className="mb-2 text-sm font-semibold text-gray-700">Байршил</div>
      <div className="flex gap-2 w-full overflow-x-auto mb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`min-h-12 px-6 py-2 rounded-lg text-sm whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === category
                ? "bg-black text-white"
                : "bg-gray-200 text-black/90"
            }`}
          >
            {category} ({deliveryCounts[category] ?? 0})
          </button>
        ))}
      </div>

      {/* БАРААНЫ ЖАГСААЛТ */}
      <div className="text-sm font-semibold text-gray-700 mb-2">Захиалгууд</div>
      <div className="grid grid-cols-3 text-xs text-gray-500 font-semibold px-2 mb-1">
        <div>Tracking #</div>
        <div>Status</div>
        <div>Огноо</div>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50 rounded-xl p-2 shadow-inner">
        {filteredOrders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          filteredOrders.map((order) => (
            <div key={order._id}>
              <UserOrderCard
                id={order._id}
                trackingNumber={order.trackingNumber}
                description={order.status}
                createdAt={order.createdAt}
                activeCategory={activeCategory}
                ref={getCargoOrderItems}
              />
            </div>
          ))
        )}
        <div className="h-10" />
      </div>
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
