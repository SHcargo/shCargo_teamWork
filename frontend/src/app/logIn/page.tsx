"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, LockKeyhole, UserPlus2, Eye, EyeOff } from "lucide-react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import Logo from "@/components/ui/logoSh";
import { Button } from "@/components/ui/button"; // Make sure you import your custom Button

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Имэйл хаяг оруулна уу")
    .email("Буруу имэйл хаяг байна"),
});

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [userPassword, setUserPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-screen h-screen flex justify-center bg-[rgb(221,221,221)]">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={async (values) => {
          try {
            setOtpLoading(true);

            await axios.post(
              `${process.env.NEXT_PUBLIC_BASE_URL}/otp/send-login-otp`,
              {
                email: values.email,
              }
            );

            setOtpEmail(values.email);
            setUserPassword(values.password);
            setOtpSent(true);

            toast.info("📧 Таны имэйл рүү баталгаажуулах код илгээгдлээ!");
          } catch (error) {
            console.error("OTP илгээхэд алдаа:", error);
            toast.error("Имэйл илгээхэд алдаа гарлаа.");
          } finally {
            setOtpLoading(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="max-w-2xl w-full h-full bg-[#e9ecef] py-3 px-6 flex flex-col gap-6 text-base text-black font-medium cursor-default">
            {/* Header */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-center">
                <Logo className="w-30 h-30 bg-black rounded-2xl" />
              </div>
              <h1 className="text-xl text-center font-semibold">
                Тавтай морил
              </h1>
              <p className="text-center">Та мэйл хаягаараа нэвтрэнэ үү!</p>
            </div>

            {/* Email Input */}
            <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex items-center overflow-hidden">
              <div className="w-12 flex justify-center items-center">
                <Mail className="w-5 h-5 text-gray-500" />
              </div>
              <Field
                name="email"
                type="email"
                placeholder="Мэйл хаягаа оруулна уу"
                className="flex-1 h-full px-3 py-1 outline-none text-black"
              />
            </div>
            {errors.email && touched.email && (
              <div className="text-red-500 text-sm mt-1 ml-1">
                {errors.email}
              </div>
            )}

            {/* Password Input */}
            <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex items-center overflow-hidden">
              <div className="w-12 flex justify-center items-center">
                <LockKeyhole className="w-5 h-5 text-gray-500" />
              </div>
              <div className="flex-1 relative h-full">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Нууц үгээ оруулна уу"
                  className="w-full h-full px-3 py-1 outline-none text-black"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff width={18} height={18} />
                  ) : (
                    <Eye width={18} height={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="font-semibold py-2.5 text-white bg-black hover:bg-[#303030] rounded-lg"
            >
              Нэвтрэх
            </button>

            {/* Forgot Password */}
            <div className="text-sm mt-2 text-center">
              <p className="text-gray-500 inline">Нууц үгээ мартсан бол </p>
              <span
                onClick={() => router.push("/reset-password")}
                className="text-blue-500 underline cursor-pointer"
              >
                энд дарна уу
              </span>
            </div>

            {/* Register */}
            <div className="mt-12 flex flex-col gap-4">
              <div className="border-b-2 pb-2">
                <p className="text-gray-500 text-sm">Шинээр бүртгэл үүсгэх</p>
              </div>
              <button
                type="button"
                onClick={() => router.push("/signUp")}
                className="py-2.5 w-full flex justify-center gap-3 items-center hover:bg-[#303030] bg-black font-semibold text-white rounded-lg"
              >
                <UserPlus2 width={16} height={16} />
                <p>Бүртгүүлэх</p>
              </button>
            </div>

            {/* OTP Modal */}
            {otpSent && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                  <h2 className="text-lg font-semibold mb-4">
                    Имэйл баталгаажуулах код
                  </h2>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="6 оронтой код"
                    className="border p-2 rounded w-full mb-4"
                    maxLength={6}
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={async () => {
                        try {
                          setOtpLoading(true);

                          // Verify OTP
                          await axios.post(
                            `${process.env.NEXT_PUBLIC_BASE_URL}/otp/verify-login-otp`,
                            {
                              email: otpEmail,
                              otp,
                            }
                          );

                          // Then log in
                          const response = await axios.post(
                            `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
                            {
                              email: otpEmail,
                              password: userPassword,
                              otp,
                            }
                          );

                          // Save token
                          if (typeof window !== "undefined") {
                            localStorage.setItem("token", response.data.token);
                            localStorage.setItem(
                              "loginTime",
                              new Date().toISOString()
                            );
                          }

                          toast.success("✅ Амжилттай нэвтэрлээ!");
                          setOtpSent(false);
                          router.push("/");
                        } catch (error) {
                          console.error("OTP баталгаажуулах алдаа:", error);
                          toast.error("OTP баталгаажуулахад алдаа гарлаа.");
                        } finally {
                          setOtpLoading(false);
                        }
                      }}
                      disabled={otpLoading || otp.length !== 6}
                    >
                      Баталгаажуулах
                    </Button>
                    <Button variant="outline" onClick={() => setOtpSent(false)}>
                      Буцах
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
