import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonTable() {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left border-b">
          <th className="p-2">№</th>
          <th className="p-2">Phone Number</th>
          <th className="p-2">Items</th>
          <th className="p-2">Date</th>
          <th className="p-2">Delivery Address</th>
          <th className="p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 5 }).map((_, index) => (
          <tr key={index} className="border-b">
            <td className="p-2">
              <Skeleton width={20} />
            </td>
            <td className="p-2">
              <Skeleton width={100} />
            </td>
            <td className="p-2">
              <Skeleton count={2} />
            </td>
            <td className="p-2">
              <Skeleton width={90} />
            </td>
            <td className="p-2">
              <Skeleton width={120} />
            </td>
            <td className="p-2">
              <Skeleton width={80} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
