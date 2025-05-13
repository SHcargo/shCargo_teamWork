"use client";

import { useRouter } from "next/navigation";
import { Mail, LockKeyhole, UserPlus2, Eye, EyeOff } from "lucide-react";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useState } from "react";
import Logo from "@/components/ui/logoSh";
import { Button } from "@/components/ui/button";
import { useUser } from "../providers/UserProvider";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Имэйл хаяг оруулна уу")
    .email("Буруу имэйл хаяг байна"),
  password: Yup.string().required("Нууц үг оруулна уу"),
});

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [otpPassword, setOtpPassword] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const { getUser } = useUser();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function for OTP resend cooldown
  const startResendCooldown = () => {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="w-screen h-screen flex justify-center bg-[rgb(221,221,221)]">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        enableReinitialize
        validationSchema={loginValidationSchema}
        onSubmit={async (values) => {
          try {
            setLoading(true);
            // Step 1: Request OTP to be sent to the user's email
            await axios
              .post(`${process.env.NEXT_PUBLIC_BASE_URL}/otp/send`, {
                email: values.email,
                purpose: "login",
              })
              .catch((error) => {
                if (error.response) {
                  if (error.response.status === 404) {
                    toast.error("Имэйл хаяг бүртгэлгүй байна!");
                  } else {
                    toast.error("Имэйл руу код илгээхэд алдаа гарлаа!");
                  }
                } else {
                  toast.error("Сервертэй холбогдох боломжгүй байна!");
                }
                throw error;
              });

            // Store email and password for OTP verification step
            setOtpEmail(values.email);
            setOtpPassword(values.password);
            setOtpSent(true);
            startResendCooldown();
            toast.info("📧 Таны имэйл рүү баталгаажуулах код илгээгдлээ!");
          } catch (error) {
            console.log("Error sending OTP:", error);
            // Error handling done in catch block above
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="max-w-2xl w-full h-full bg-[#e9ecef] py-3 px-6 flex flex-col gap-6 text-base text-black font-medium cursor-default">
            <div className="flex flex-col gap-1">
              <div className="flex justify-center">
                <Logo className="w-30 h-30 bg-black rounded-2xl" />
              </div>
              <h1 className="text-xl flex justify-center font-semibold">
                Тавтай морил
              </h1>
              <p>Та утасны дугаар эсвэл мэйл хаягаараа нэвтрэнэ үү!</p>
            </div>

            <div className="flex flex-col gap-6">
              {/* Email Field */}
              <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex items-center overflow-hidden">
                <div className="w-12 flex justify-center items-center">
                  <Mail className="w-5 h-5 text-gray-500" />
                </div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Мэйл хаягаа оруулна уу"
                  className="flex-1 h-full px-3 py-1 outline-none text-black cursor-text"
                />
              </div>
              {errors.email && touched.email && (
                <div className="text-red-500 text-sm mt-1 ml-1">
                  {errors.email}
                </div>
              )}

              {/* Password Field */}
              <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex items-center overflow-hidden">
                <div className="w-12 flex justify-center items-center">
                  <LockKeyhole className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex-1 relative h-full">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Нууц үгээ оруулна уу"
                    className="w-full h-full px-3 py-1 outline-none text-black cursor-text"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff width={18} height={18} />
                    ) : (
                      <Eye width={18} height={18} />
                    )}
                  </button>
                </div>
              </div>
              {errors.password && touched.password && (
                <div className="text-red-500 text-sm mt-1 ml-1">
                  {errors.password}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="font-semibold cursor-pointer py-2.5 text-white bg-black hover:bg-[#303030] rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Илгээж байна..." : "Нэвтрэх"}
            </button>

            {/* OTP Verification Modal */}
            {otpSent && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                  <h2 className="text-lg font-semibold mb-4">
                    Имэйл баталгаажуулах код
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    {otpEmail} хаяг руу илгээсэн 6 оронтой кодыг оруулна уу
                  </p>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      // Only allow numbers and limit to 6 digits
                      const value = e.target.value
                        .replace(/[^\d]/g, "")
                        .slice(0, 6);
                      setOtp(value);
                    }}
                    placeholder="6 оронтой код"
                    className="border p-2 rounded w-full mb-4"
                    maxLength={6}
                  />
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-2 justify-between">
                      <Button
                        onClick={async () => {
                          try {
                            setLoading(true);

                            // If OTP verification succeeds, then attempt login
                            try {
                              const loginResponse = await axios.post(
                                `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
                                {
                                  email: otpEmail,
                                  password: otpPassword,
                                  otp: otp,
                                }
                              );

                              // Handle successful login
                              if (
                                loginResponse &&
                                loginResponse.data &&
                                loginResponse.data.token
                              ) {
                                // Store auth token and user info
                                if (typeof window !== "undefined") {
                                  localStorage.setItem(
                                    "token",
                                    loginResponse.data.token
                                  );
                                  localStorage.setItem("email", otpEmail);
                                  localStorage.setItem(
                                    "loginTime",
                                    new Date().toISOString()
                                  );
                                }

                                toast.success(
                                  "✅ Хэрэглэгч амжилттай нэвтэрлээ!"
                                );
                                setOtpSent(false);
                                router.push("/");
                                await getUser();
                              } else {
                                toast.error("Токен мэдээлэл алга байна!");
                              }
                            } catch (loginError) {
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              const error = loginError as any;
                              if (error.response) {
                                if (error.response.status === 400) {
                                  toast.error(
                                    "Нэг удаагын нууц үг баталгаажуулах шаардлагатай!"
                                  );
                                } else if (error.response.status === 401) {
                                  toast.error("Нууц үг буруу байна!");
                                } else if (error.response.status === 404) {
                                  toast.error("Хэрэглэгч олдсонгүй!");
                                } else {
                                  toast.error("Нэвтрэх үед алдаа гарлаа!");
                                }
                              } else {
                                toast.error(
                                  "Сервертэй холбогдох боломжгүй байна!"
                                );
                              }
                            }
                          } catch (error) {
                            console.error("Authentication error:", error);
                            // Specific error handling already done in catch blocks above
                          } finally {
                            setLoading(false);
                          }
                        }}
                        disabled={loading || otp.length !== 6}
                        className="flex-1"
                      >
                        {loading ? "Баталгаажуулж байна..." : "Баталгаажуулах"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setOtpSent(false)}
                        className="flex-1"
                      >
                        Буцах
                      </Button>
                    </div>

                    <div className="text-sm text-center border-t pt-3 mt-2">
                      <Button
                        variant="link"
                        disabled={resendCooldown > 0 || loading}
                        onClick={async () => {
                          try {
                            setLoading(true);
                            await axios.post(
                              `${process.env.NEXT_PUBLIC_BASE_URL}/otp/send-login-otp`,
                              { email: otpEmail }
                            );
                            toast.info("📧 Шинэ код илгээгдлээ!");
                            startResendCooldown();
                          } catch (error) {
                            toast.error("Код дахин илгээхэд алдаа гарлаа!");
                            console.log(error);
                          } finally {
                            setLoading(false);
                          }
                        }}
                        className="text-blue-500"
                      >
                        {resendCooldown > 0
                          ? `Дахин код авах (${resendCooldown} секунд)`
                          : "Дахин код авах"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Forgot Password */}
            <div className="flex gap-1 text-sm mt-2">
              <p className="text-gray-500">Нууц үгээ мартсан бол</p>
              <span
                onClick={() => router.push("/reset-password")}
                className="text-blue-500 underline cursor-pointer"
              >
                энд дарна уу ?
              </span>
            </div>

            {/* Register Section */}
            <div className="mt-12 flex flex-col gap-4">
              <div className="border-b-2 pb-2">
                <p className="text-gray-500 text-sm">Шинээр бүртгэл үүсгэх</p>
              </div>
              <button
                type="button"
                className="py-2.5 w-full cursor-pointer flex justify-center gap-3 items-center hover:bg-[#303030] bg-black font-semibold text-white rounded-lg"
                onClick={() => router.push("/signUp")}
              >
                <UserPlus2 width={16} height={16} />
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
