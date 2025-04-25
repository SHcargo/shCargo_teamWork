"use client";

import { useRouter } from "next/navigation";
import Logo from "../ui/Logo";
import { PhoneCallIcon, LockKeyhole, UserPlus2 } from "lucide-react";
import { Field, Form, Formik } from "formik";
import axios from "axios";
// import { toast } from "react-toastify"; // assuming you're using react-toastify

const Login = () => {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex justify-center bg-[rgb(221,221,221)]">
      <Formik
        initialValues={{
          phoneNumber: "",
          password: "",
        }}
        enableReinitialize
        onSubmit={async (values) => {
          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
              {
                phoneNumber: values.phoneNumber,
                password: values.password,
              }
            );
            router.push("/");
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("phoneNumber", values.phoneNumber);
            console.log("log in success", response);
          } catch (error) {
            console.log("error in login:", error);
          }
        }}
      >
        {({}) => (
          <Form className="max-w-2xl w-full h-full bg-[#e9ecef] py-3 px-6 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Logo />
              <h1 className="text-[#5F2DF5] text-2xl font-semibold">
                SH Cargo
              </h1>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-black font-semibold">Тавтай морил</h1>
              <p className="text-black font-medium">
                Та утасны дугаар эсвэл мэйл хаягаараа нэвтрэнэ үү!
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex">
                <div className="w-12 flex justify-center items-center bg-white">
                  <PhoneCallIcon className="1/4" />
                </div>
                <Field
                  name="phoneNumber"
                  type="text"
                  placeholder="Утасны дугаараа оруулна уу"
                  className="w-full h-full text-black px-3 py-0.5"
                />
              </div>

              <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex">
                <div className="w-12 flex justify-center items-center bg-white">
                  <LockKeyhole className="1/4" />
                </div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Нууц үгээ оруулна уу"
                  className="w-full h-full text-black px-3 py-0.5"
                />
              </div>
            </div>

            <button
              type="submit"
              className="text-2xl font-semibold py-3 px-6 text-white bg-[#5F2DF5] rounded-lg"
            >
              Нэвтрэх
            </button>

            <div className="mt-12 flex flex-col gap-12">
              <p className="text-gray-500">Шинээр бүртгэл үүсгэх</p>
              <div className="w-full border-t-2 border-gray-300">Шинээр</div>
              <button
                type="button"
                className="text-2xl w-full flex justify-center gap-3 items-center font-semibold py-3 px-6 text-white bg-[#5F2DF5] rounded-lg"
                onClick={() => router.push("/signUp")}
              >
                <UserPlus2 />
                <p>Бүртгүүлэх</p>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
