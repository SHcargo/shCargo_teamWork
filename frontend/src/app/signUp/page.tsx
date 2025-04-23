"use client";

import { useRouter } from "next/navigation";
import Logo from "../ui/Logo";
import { PhoneCallIcon, LockKeyhole, User, Mail } from "lucide-react";
import { Formik, Form, Field } from "formik";
import axios from "axios";

const Register = () => {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex justify-center bg-[rgb(221,221,221)]">
      <div className="max-w-2xl w-full h-full bg-[#e9ecef] py-3 px-6">
        <Formik
          initialValues={{
            name: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
          }}
          enableReinitialize
          onSubmit={async (values) => {
            try {
              const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/signUp`,
                {
                  email: values.email,
                  password: values.confirmPassword,
                  phoneNumber: values.phoneNumber,
                  name: values.name,
                }
              );
              // toast.success("✅ Амжилттай бүртгэгдлээ!", {
              //   position: "top-right",
              //   autoClose: 5000,
              // });
              console.log("user created successfuly", response);
            } catch (error) {
              console.log("error in registration:", error);
              // toast.error("😕 Бүртгэхэд алдаа гарлаа.");
            }
          }}
        >
          {() => (
            <Form className="flex flex-col gap-6">
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

              {/* Name */}
              <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex">
                <div className="w-12 flex justify-center items-center bg-white">
                  <User className="1/4" />
                </div>
                <Field
                  name="name"
                  placeholder="Нэрээ оруулна уу"
                  className="w-full h-full text-black px-3 py-0.5"
                />
              </div>

              {/* Email */}
              <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex">
                <div className="w-12 flex justify-center items-center bg-white">
                  <Mail className="1/4" />
                </div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Имэйл хаяг"
                  className="w-full h-full text-black px-3 py-0.5"
                />
              </div>

              {/* Phone */}
              <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex">
                <div className="w-12 flex justify-center items-center bg-white">
                  <PhoneCallIcon className="1/4" />
                </div>
                <Field
                  name="phoneNumber"
                  placeholder="Утасны дугаар"
                  className="w-full h-full text-black px-3 py-0.5"
                />
              </div>

              {/* Password */}
              <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex">
                <div className="w-12 flex justify-center items-center bg-white">
                  <LockKeyhole className="1/4" />
                </div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Нууц үг"
                  className="w-full h-full text-black px-3 py-0.5"
                />
              </div>

              {/* Confirm Password */}
              <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex">
                <div className="w-12 flex justify-center items-center bg-white">
                  <LockKeyhole className="1/4" />
                </div>
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Нууц үгээ баталгаажуулна уу"
                  className="w-full h-full text-black px-3 py-0.5"
                />
              </div>

              <button
                type="submit"
                className="text-2xl font-semibold py-3 px-6 text-white bg-[#5F2DF5] rounded-lg"
              >
                Бүртгүүлэх
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
