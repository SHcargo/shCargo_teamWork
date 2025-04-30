import { Search } from "lucide-react";
type Props = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};
export const SearchBar = ({ searchValue, setSearchValue }: Props) => {
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
        </div>
      </div>
    </div>
  );
};
export default SearchBar;
