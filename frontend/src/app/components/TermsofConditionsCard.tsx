import { ChevronDown } from "lucide-react";
import { useState } from "react";

type InfoCardProps = {
  title?: string;
  subtitle?: string;
};

export const TermsofConditionsCard = ({ title, subtitle }: InfoCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full bg-white rounded-lg flex flex-col overflow-hidden">
      <div
        className="flex h-12 items-center justify-between pl-5 pr-2 cursor-pointer"
        onClick={handleClick}
      >
        <div>
          <p className="text-[#212529] font-medium">{title}</p>
        </div>
        <button>
          <ChevronDown color="#5F2DF5" />
        </button>
      </div>

      {isOpen && subtitle && (
        <div className="px-5 pb-3">
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      )}
    </div>
  );
};
