import { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
type UserManualCardProps = {
  icon: LucideIcon;
  title: string;
  onClick?: () => void;
};
export const UserManualCard = ({ title, onClick }: UserManualCardProps) => {
  return (
    <div
      className="flex w-full items-center justify-between flex-wrap bg-white p-2.5 rounded-lg  border-gray-200 border shadow-sm hover:shadow-2xl transition-all duration-200 ease-in-out"
      onClick={onClick}
    >
      <p className="text-base break-words whitespace-normal">{title}</p>
      <ChevronRight className="flex-shrink-0 ml-2" />
    </div>
  );
};
