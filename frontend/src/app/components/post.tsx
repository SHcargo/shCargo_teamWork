import { useState } from "react";

export const Post = () => {
  const [select, setSelect] = useState(true);

  const handleSelect = () => {
    if (select) setSelect(false);
  };

  const handleBack = () => {
    setSelect(true);
  };

  return (
    <div className="w-full flex gap-4 overflow-hidden">
      {/* Left Panel */}
      <div
        className={`bg-gray-100 p-4 rounded-xl border border-gray-200 cursor-pointer transform transition-all duration-500 ease-in-out ${
          select ? "w-1/2" : "w-full translate-x-0"
        }`}
        onClick={handleSelect}
      >
        <p className="text-sm font-semibold text-red-600 flex justify-between items-center">Илгээмж бүртгэх <button className={`text-gray-400 text-xl ${select ? "block" : "hidden"}`}>›</button></p>
        
        <div
          className={`items-center mt-2 transition-all duration-500 ease-in-out ${
            select ? "opacity-0 h-0 overflow-hidden" : "opacity-100 h-auto flex"
          }`}
        >
          <span className="text-gray-500 mr-2">📦</span>
          <input
            type="text"
            placeholder="Илгээмжийн дугаар бичих"
            className="flex-1 p-2 border border-gray-300 rounded-lg text-gray-700"
          />
          <button
            className="ml-2 px-3 py-2 bg-red-500 text-white rounded-lg"
            onClick={handleBack}
          >
            ➤
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div
        className={`bg-red-100 p-4 rounded-xl transform transition-all duration-500 ease-in-out ${
          select ? "w-1/2 opacity-100 translate-x-0 flex" : "w-0 opacity-0 translate-x-4 hidden"
        } items-center justify-between`}
      >
        <span className="text-red-600 font-semibold text-lg">📍 Хүргэлтүүд</span>
        <button className="text-gray-400 text-xl">›</button>
      </div>
    </div>
  );
};

export default Post;
