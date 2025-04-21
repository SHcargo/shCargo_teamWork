const Header = () => {
  return (
    <div className="max-w-7xl h-[100px]  bg-black flex justify-center">
      <div className="w-full h-full bg-red-500 flex gap-4 items-center  ">
        <img src="/track.jpg" className="w-12 h-12" />
        <h1 className="text-[32px] font-semibold">SH Cargo</h1>
      </div>
    </div>
  );
};

export default Header;
