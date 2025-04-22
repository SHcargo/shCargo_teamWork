"use client";

import { useRouter } from "next/navigation";
import NavBar from "../components/NavBar";
import Logo from "../ui/Logo";
import { PhoneCallIcon, LockKeyhole, User } from "lucide-react";

const Login = () => {
  const router = useRouter();
  return (
    <div className="w-screen h-screen  flex justify-center bg-[rgb(221,221,221)]">
      <div className="max-w-2xl w-full h-full  bg-[#e9ecef]  py-3 px-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Logo />
            <h1 className="text-[#5F2DF5] text-2xl font-semibold">SH Cargo</h1>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-black font-semibold">Тавтай морил </h1>
            <p className="text-black font-medium">
              {" "}
              Та утасны дугаар эсвэл мэйл хаягаараа нэвтрэнэ үү !
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex justify-between">
              <div className="w-12 flex justify-center items-center rounded-lg bg-white">
                <User className="1/4 " />
              </div>
              <input
                className="w-full h-full text-black  px-3 py-0.5"
                placeholder="Нэрээ оруулна уу "
              />
            </div>
            <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex justify-between">
              <div className="w-12 flex justify-center items-center rounded-lg bg-white">
                <PhoneCallIcon className="1/4 " />
              </div>
              <input
                className="w-full h-full text-black  px-3 py-0.5"
                placeholder="Утасны дугаараа оруулна уу "
              />
            </div>
            <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex justify-between">
              <div className="w-12 flex justify-center items-center rounded-lg bg-white">
                <LockKeyhole className="1/4 " />
              </div>
              <input
                className="w-full h-full text-black  px-3 py-0.5"
                placeholder="Нууц үгээ оруулна уу "
              />
            </div>
            <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex justify-between">
              <div className="w-12 flex justify-center items-center rounded-lg bg-white">
                <LockKeyhole className="1/4 " />
              </div>
              <input
                className="w-full h-full text-black  px-3 py-0.5"
                placeholder="Нууц үгээ давтан оруулна уу "
              />
            </div>
          </div>
          <button className="text-2xl font-semibold py-3 px-6 text-white bg-[#5F2DF5] rounded-lg">
            Бүртгүүлэх
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
