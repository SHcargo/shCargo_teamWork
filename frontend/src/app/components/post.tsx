export const Post = () => {
  return (
    <div className=" bg-gray-100 p-4 rounded-xl border border-gray-200">
      <p className="text-sm font-semibold text-red-600">Илгээмж бүртгэх</p>
      <div className="flex items-center mt-2">
        <span className="text-gray-500 mr-2">📦</span>
        <input
          type="text"
          placeholder="Илгээмжийн дугаар бичих"
          className="flex-1 p-2 border border-gray-300 rounded-lg text-gray-700"
        />
        <button className="ml-2 px-3 py-2 bg-red-500 text-white rounded-lg">
          ➤
        </button>
      </div>
    </div>
  );
};
export default Post;
