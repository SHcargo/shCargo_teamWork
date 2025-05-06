import { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";

type InfoCardProps = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  onClick?: () => void;
};

const InfoCard = ({ icon: Icon, title, subtitle, onClick }: InfoCardProps) => (
  <div
    className="w-full 2xl:w-50 2xl:h-35 cursor-pointer bg-white rounded-lg flex p-4 overflow-hidden border-gray-200 border-1.5 shadow-sm hover:shadow-xl transition-all duration-200 ease-in-out"
    onClick={onClick}
  >
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex items-center justify-between">
        {" "}
        <Icon stroke="black" width={22} height={22} />{" "}
        <button
          onClick={onClick}
          className="bg-gray-200 p-1.5 flex items-center justify-center rounded-sm cursor-pointer"
        >
          <ChevronRight color="#000" width={16} height={16} />
        </button>
      </div>
      <div>
        <p className="text-[#212529] font-medium">{title}</p>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </div>
  </div>
);

export default InfoCard;
