import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search, Star, Tag, ChevronDown } from "lucide-react";

export const SearchBar = () => {
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("query") ?? ""
  );
  return (
    <div>
      <div className="w-full max-w-xl">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search "
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full px-4 py-2 pl-10 text-black bg-white border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          <div className="relative">
            <button className="h-full px-4 py-2 text-black bg-white border border-[#E5E5E5] rounded-lg hover:bg-gray-50 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span>Tags</span>
              <ChevronDown className={`w-4 h-4 transition-transform`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchBar;
