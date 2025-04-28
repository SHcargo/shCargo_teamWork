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
    className="w-60 h-60 bg-white rounded-lg flex p-5 overflow-hidden"
    onClick={onClick}
  >
    <div className=" gap-5 w-full">
      <div className="w-full flex justify-between">
        {" "}
        <Icon stroke="#5F2DF5" />{" "}
        <button
          onClick={onClick}
          className="bg-[#5F2DF5] h-10 w-10 flex items-center justify-center rounded-sm"
        >
          <ChevronRight color="#fff" />
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
