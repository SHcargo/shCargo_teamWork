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
    className="w-50 h-35 cursor-pointer bg-white rounded-lg flex p-5 overflow-hidden"
    onClick={onClick}
  >
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex items-center justify-between">
        {" "}
        <Icon stroke="#5F2DF5" width={22} height={22} />{" "}
        <button
          onClick={onClick}
          className="bg-[#5F2DF5] p-1 flex items-center justify-center rounded-sm"
        >
          <ChevronRight color="#fff" width={16} height={16} />
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
