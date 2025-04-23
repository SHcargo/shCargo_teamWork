import Logo from "../ui/Logo";
import NotfIcon from "../ui/NotfIcon";
import SearchIcon from "../ui/SearchIcon";

const Header = () => {
  return (
    <div className="w-screen flex abslote top-0 justify-center h-[100px]">
      <div className="max-w-2xl w-full px-6 bg-[#11043B] shadow-md flex justify-between items-center">
        <div className="flex gap-3">
          <Logo />
          <h1 className="text-2xl font-semibold flex items-center text-[#5F2DF5]">SH Cargo</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-lg p-2 bg-[#5F2DF5]">
            <SearchIcon />
          </button>
          <button className="rounded-lg p-2 bg-[#5F2DF5]">
            <NotfIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
