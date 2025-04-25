import { useState } from "react";
import axios from "axios";
import { useUser } from "../providers/UserProvider";

export const Post = () => {
  const [select, setSelect] = useState(true);
  const [trackingNumber, setTrackingNumber] = useState("");
  const { userId } = useUser();

  const handleSelect = () => {
    setSelect(false);
  };

  const handleBack = () => {
    setSelect(true);
    setTrackingNumber("");
  };

  const handleSubmitTracking = async () => {
    if (!trackingNumber) return;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/truckItems`,
        {
          userId,
          trackingNumber,
        }
      );

      console.log("Submitted tracking:", response.data);
      handleBack();
    } catch (error) {
      console.error("Error submitting tracking number:", error);
    }
  };

  return (
    <div className="w-full flex gap-4 overflow-hidden">
      {/* Left Panel */}
      <div
        className={`bg-gray-100 p-4 rounded-xl border border-gray-200 cursor-pointer transform transition-all duration-500 ease-in-out ${
          select ? "w-1/2" : "w-full"
        }`}
        onClick={select ? handleSelect : undefined}
      >
        <p className="text-sm font-semibold text-red-600 flex justify-between items-center">
          Илгээмж бүртгэх
          {select && <button className="text-gray-400 text-xl">›</button>}
        </p>

        {/* Input Form */}
        {!select && (
          <div className="items-center mt-2 flex transition-all duration-500">
            <span className="text-gray-500 mr-2">📦</span>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Илгээмжийн дугаар бичих"
              className="flex-1 p-2 border border-gray-300 rounded-lg text-gray-700"
            />
            <button
              className="ml-2 px-3 py-2 bg-red-500 text-white rounded-lg"
              onClick={handleSubmitTracking}
            >
              ➤
            </button>
          </div>
        )}
      </div>

      {/* Right Panel */}
      <div
        className={`bg-red-100 p-4 rounded-xl transition-all duration-500 ease-in-out ${
          select
            ? "w-1/2 opacity-100 translate-x-0 flex"
            : "w-0 opacity-0 translate-x-4 hidden"
        } items-center justify-between`}
      >
        <span className="text-red-600 font-semibold text-lg">
          📍 Хүргэлтүүд
        </span>
        <button className="text-gray-400 text-xl">›</button>
      </div>
    </div>
  );
};

export default Post;
