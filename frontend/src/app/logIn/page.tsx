"use client";

import { useRouter } from "next/navigation";
import Logo from "../ui/Logo";
import {
  PhoneCallIcon,
  LockKeyhole,
  UserPlus2,
  Eye,
  EyeOff,
} from "lucide-react";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useState } from "react";

const loginValidationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("Утасны дугаар оруулна уу")
    .matches(/^[0-9]{8}$/, "Утасны дугаар 8 оронтой тоо байх ёстой"),
});

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const phoneNumber = localStorage.getItem("phoneNumber");

  return (
    <div className="w-screen h-screen flex justify-center bg-[rgb(221,221,221)]">
      <Formik
        initialValues={{
          phoneNumber: phoneNumber ? phoneNumber : "",
          password: "",
        }}
        enableReinitialize
        validationSchema={loginValidationSchema}
        onSubmit={async (values) => {
          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
              {
                phoneNumber: values.phoneNumber,
                password: values.password,
              }
            );

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("phoneNumber", values.phoneNumber);
            toast.success("Амжилттай нэвтэрлээ!");
            router.push("/");
            console.log("log in success", response);
            localStorage.setItem("loginTime", new Date().toISOString());
          } catch (error) {
            console.log("error in login:", error);
            toast.error("Нэвтрэх нэр эсвэл нууц үг буруу байна!");
          }
        }}
      >
        {({ errors, touched }) => (
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

            <div className="flex flex-col">
              <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex items-center overflow-hidden">
                <div className="w-12 flex justify-center items-center">
                  <PhoneCallIcon className="w-5 h-5 text-gray-500" />
                </div>

                <Field
                  name="phoneNumber"
                  type="text"
                  placeholder="Утасны дугаараа оруулна уу"
                  className="flex-1 h-full text-black px-3 py-1 outline-none"
                />
              </div>
              {errors.phoneNumber && touched.phoneNumber && (
                <div className="text-red-500 text-sm mt-1 flex left-1">
                  {errors.phoneNumber}
                </div>
              )}

              <div className="w-full mt-6 h-10 bg-white border-2 border-gray-300 rounded-lg flex items-center overflow-hidden">
                <div className="w-12 flex justify-center items-center bg-white">
                  <LockKeyhole className="w-5 h-5 text-gray-500" />
                </div>

                <div className="flex-1 relative h-full">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Нууц үгээ оруулна уу"
                    className="w-full h-full text-black px-3 py-1 outline-none"
                  />

                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff width={18} height={18} cursor={"pointer"} />
                    ) : (
                      <Eye width={18} height={18} cursor={"pointer"} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className=" font-semibold cursor-pointer py-2.5  text-white bg-black  hover:bg-[#303030] rounded-lg"
            >
              Нэвтрэх
            </button>
            <div className="flex flex-col gap-8"></div>
            <div className=" flex  gap-1">
              <p className="text-gray-500">Нууц үгээ мартсан бол</p>
              <span
                onClick={() => router.push("/reset-password")}
                className="text-blue-500 underline cursor-pointer"
              >
                энд дарна уу ?
              </span>
            </div>

            <div className="mt-12 flex flex-col gap-8">
              <div className="border-b-2 py-2">
                <p className="text-gray-500">Шинээр бүртгэл үүсгэх</p>
              </div>
              <button
                type="button"
                className="py-2.5  w-full cursor-pointer flex justify-center gap-3 items-center  hover:bg-[#303030] bg-black  font-semibold  text-white rounded-lg"
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
