/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useUser } from "../providers/UserProvider";
import axios from "axios";
import { UserOrderCard } from "../components/userOrderCard";
import Post from "../components/post";

type StatusCategory =
  | "Бүгд"
  | "Бүртгэсэн"
  | "Замдаа"
  | "УБ-д ирсэн"
  | "Хаагдсан";

type StatusHistory = {
  status: string;
  changedAt: string;
  _id: string;
};

type Order = {
  _id: string;
  userId: string;
  status: StatusCategory;
  createdAt: string;
  trackingNumber: string;
  statusHistory: StatusHistory[];
  __v: number;
  delivery?: string | null;
};

type DeliveryCounts = Record<StatusCategory, number>;

const categories: StatusCategory[] = [
  "Бүгд",
  "Бүртгэсэн",
  "Замдаа",
  "УБ-д ирсэн",
  "Хаагдсан",
];

const Cargo = () => {
  const value = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeCategory, setActiveCategory] = useState<StatusCategory>("Бүгд");
  const [loading, setLoading] = useState<boolean>(false);
  const [deliveryCounts, setDeliveryCounts] = useState<DeliveryCounts>({
    Бүгд: 0,
    Бүртгэсэн: 0,
    Замдаа: 0,
    "УБ-д ирсэн": 0,
    Хаагдсан: 0,
  });
console.log(orders)
  const getCargoOrderItems = async (): Promise<void> => {
    setLoading(true);
    if (!value.userId) {
      setLoading(false);
      return;
    }

    try {
      // Ачааны жагсаалт авах
      const response = await axios.get<{ orders: Order[] }>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/truckItems/${value.userId}`
      );
      const ordersData = response.data.orders;

      setOrders(ordersData);

      // Төрлөөр нь тоолох
      const counts = categories.reduce<DeliveryCounts>(
        (acc, category) => {
          acc[category] =
            category === "Бүгд"
              ? ordersData.length
              : ordersData.filter((order) => order.status === category).length;
          return acc;
        },
        {
          Бүгд: 0,
          Бүртгэсэн: 0,
          Замдаа: 0,
          "УБ-д ирсэн": 0,
          Хаагдсан: 0,
        }
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
  }, [value]);

  const filteredOrders =
    activeCategory === "Бүгд"
      ? orders
      : orders.filter((order) => order.status === activeCategory);

  const handleCategoryClick = (category: StatusCategory) => {
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
    <div className="flex flex-col w-full fixed max-w-2xl mx-auto p-4 bg-white overflow-hidden z-10" style={{ height: "calc(100% - 140px)" }}>
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
            {category} ({deliveryCounts[category]})
          </button>
        ))}
      </div>

      {/* БАРААНЫ ЖАГСААЛТ */}
      <div className="text-sm font-semibold text-gray-700 mb-2">Захиалгууд</div>

      <div className="flex-1 overflow-y-auto bg-gray-50 rounded-xl p-2 shadow-inner z-40">
        {filteredOrders.length === 0 ? (
          <p className="text-center text-gray-500">Захиалга олдсонгүй.</p>
        ) : (
          filteredOrders.map((order) => (
            <div key={order._id}>
              <UserOrderCard
                order={order}
                activeCategory={activeCategory}
                onRefresh={getCargoOrderItems}
              />
            </div>
          ))
        )}
        <div className="h-70" />
      </div>

      <Post refreshFn={getCargoOrderItems} />
    </div>
  );
};

export default Cargo;
