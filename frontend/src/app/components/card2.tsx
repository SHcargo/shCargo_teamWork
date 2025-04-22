import { LucideIcon } from 'lucide-react';  
import { ChevronRight } from 'lucide-react'; 

type InfoCardProps = {  
  icon: LucideIcon;
  title: string;
  subtitle: string;
  onClick?: () => void;
};

const InfoCard = ({ icon: Icon, title, subtitle, onClick }: InfoCardProps) => (

    <div className="w-full h-12 bg-white rounded-lg flex items-center pl-5 overflow-hidden" onClick={onClick}>
      <div className="flex items-center gap-5 w-full">
        <Icon stroke="#5F2DF5" />
        <div>
          <p className="text-[#212529] font-medium">{title}</p>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>
      <button
        onClick={onClick}  
        className="bg-[#5F2DF5] h-full w-10 flex items-center justify-center rounded-r-lg"
      >
        <ChevronRight color="#fff" />
      </button>
    </div>
  
);

export default InfoCard;
