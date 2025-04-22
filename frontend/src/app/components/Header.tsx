import Logo from "../ui/Logo";
import NotfIcon from "../ui/NotfIcon";
import SearchIcon from "../ui/SearchIcon";

const Header = () => {
  return (
    <div className="w-screen flex abslote top-0 justify-center h-[100px]">
      <div className="max-w-sm w-full  bg-black shadow-md flex justify-around items-center">
        <div className="flex gap-3">
          <Logo />
          <h1 className="text-2xl font-semibold flex items-center">SH Cargo</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-lg p-2 bg-gray-500">
            <SearchIcon />
          </button>
          <button className="rounded-lg p-2 bg-gray-500">
            <NotfIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
