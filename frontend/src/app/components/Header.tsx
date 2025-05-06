import Logo from "../ui/Logo";
import NotfIcon from "../ui/NotfIcon";
import SearchIcon from "../ui/SearchIcon";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotifContent from "./NotifContent";

const Header = () => {
  return (
    <div className="w-screen flex justify-center h-[70px]  fixed top-0 z-50">
      <div className="max-w-2xl w-full px-6 bg-[#101010] shadow-md flex justify-between items-center">
        <div className="flex gap-3">
          <Logo />
          <h1 className="text-2xl font-semibold flex items-center text-[#ffff]">
            SH Cargo
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-lg p-2 bg-[#303030]">
            <SearchIcon />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <button className="rounded-lg p-2 cursor-pointer bg-[#303030]">
                <NotfIcon />
              </button>
            </DropdownMenuTrigger>
            <NotifContent />
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
