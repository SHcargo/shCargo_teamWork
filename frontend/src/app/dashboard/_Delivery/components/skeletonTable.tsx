import { FC } from "react";

const SkeletonTable: FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-2">
              <div className="h-4 bg-gray-300 animate-pulse w-32 rounded"></div>
            </th>
            <th className="px-4 py-2">
              <div className="h-4 bg-gray-300 animate-pulse w-24 rounded"></div>
            </th>
            <th className="px-4 py-2">
              <div className="h-4 bg-gray-300 animate-pulse w-24 rounded"></div>
            </th>
            <th className="px-4 py-2">
              <div className="h-4 bg-gray-300 animate-pulse w-48 rounded"></div>
            </th>
            <th className="px-4 py-2">
              <div className="h-4 bg-gray-300 animate-pulse w-32 rounded"></div>
            </th>
            <th className="px-4 py-2">
              <div className="h-4 bg-gray-300 animate-pulse w-32 rounded"></div>
            </th>
            <th className="px-4 py-2">
              <div className="h-4 bg-gray-300 animate-pulse w-24 rounded"></div>
            </th>
            <th className="px-4 py-2">
              <div className="h-4 bg-gray-300 animate-pulse w-40 rounded"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index} className="border-b animate-pulse">
              <td className="px-4 py-2">
                <div className="h-4 bg-gray-300 rounded"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-4 bg-gray-300 rounded"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-4 bg-gray-300 rounded"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-4 bg-gray-300 rounded"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-4 bg-gray-300 rounded"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-4 bg-gray-300 rounded"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-4 bg-gray-300 rounded"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-4 bg-gray-300 rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonTable;
