"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  LockKeyhole,
  UserPlus2,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
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
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const { getUser, loading: userLoading } = useUser();

  useEffect(() => {
    if (loginSuccessful && !userLoading) {
      router.push("/");
    }
  }, [loginSuccessful, userLoading, router]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

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

  // Handle OTP verification and login
  const handleVerifyAndLogin = async () => {
    if (otp.length !== 6) {
      toast.error("6 оронтой код оруулна уу");
      return;
    }
    try {
      setLoading(true);
      const loginResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
        {
          email: otpEmail,
          password: otpPassword,
          otp: otp,
        }
      );
      if (loginResponse?.data?.success && loginResponse.data.token) {
        if (typeof window !== "undefined") {
          localStorage.setItem("token", loginResponse.data.token);
          localStorage.setItem("email", otpEmail);
          localStorage.setItem("loginTime", new Date().toISOString());
        }
        toast.success("✅ Хэрэглэгч амжилттай нэвтэрлээ!");
        setOtpSent(false);
        await getUser();
        setLoginSuccessful(true);
      } else {
        toast.error("Серверээс хариу ирсэн ч токен мэдээлэл алга байна!");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const errorMessage = error.response?.data?.message;
        if (status === 400) {
          toast.error(errorMessage || "Буруу хүсэлт илгээгдлээ");
        } else if (status === 401) {
          toast.error(errorMessage || "Нууц үг буруу байна");
        } else if (status === 404) {
          toast.error(errorMessage || "Хэрэглэгч олдсонгүй");
        } else {
          toast.error(errorMessage || "Нэвтрэх үед алдаа гарлаа");
        }
      } else {
        toast.error("Сервертэй холбогдох боломжгүй байна");
      }
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP resend
  const handleResendOTP = async () => {
    if (resendCooldown > 0 || loading) return;
    try {
      setLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/otp/send`, {
        email: otpEmail,
        purpose: "login",
      });
      toast.info("📧 Шинэ код илгээгдлээ!");
      startResendCooldown();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        toast.error(errorMessage || "Код дахин илгээхэд алдаа гарлаа!");
      } else {
        toast.error("Код дахин илгээхэд алдаа гарлаа!");
      }
      console.error("OTP resend error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center bg-[rgb(221,221,221)]">
      {loginSuccessful && userLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-black animate-spin mb-4" />
            <p className="text-lg font-medium">
              Хэрэглэгчийн мэдээлэл ачаалж байна...
            </p>
          </div>
        </div>
      )}

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={async (values) => {
          try {
            setLoading(true);
            // 1. Precheck email and password
            const precheck = await axios.post(
              `${process.env.NEXT_PUBLIC_BASE_URL}/auth/precheck`,

              {
                email: values.email,
                password: values.password,
              }
            );
            if (precheck.data.success) {
              // 2. Send OTP only if precheck is successful
              await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/otp/send`, {
                email: values.email,
                purpose: "login",
              });
              setOtpEmail(values.email);
              setOtpPassword(values.password);
              setOtpSent(true);
              startResendCooldown();
              toast.info("📧 Таны имэйл рүү баталгаажуулах код илгээгдлээ!");
            } else {
              toast.error(
                precheck.data.message || "Имэйл эсвэл нууц үг буруу байна!"
              );
            }
          } catch (error) {
            if (axios.isAxiosError(error)) {
              const status = error.response?.status;
              const errorMessage = error.response?.data?.message;
              if (status === 404) {
                toast.error(errorMessage || "Имэйл хаяг бүртгэлгүй байна!");
              } else if (status === 401) {
                toast.error(errorMessage || "Нууц үг буруу байна!");
              } else {
                toast.error(
                  errorMessage || "Имэйл руу код илгээхэд алдаа гарлаа!"
                );
              }
            } else {
              toast.error("Сервертэй холбогдох боломжгүй байна!");
            }
            console.error("Precheck or OTP send error:", error);
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="max-w-2xl w-full h-full bg-[#e9ecef] py-3 px-6 flex flex-col gap-6 text-base text-black font-medium cursor-default">
            <div className="flex justify-center mb-4">
              <Logo className="w-24 h-24 bg-black rounded-2xl p-2" />
            </div>
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
              Тавтай морилно уу!
            </h1>
            <p className="text-center text-gray-500 mb-6">
              Бүртгэлтэй мэйл хаягаа ашиглан нэвтэрнэ үү.
            </p>
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
            <button
              type="submit"
              className="font-semibold cursor-pointer py-2.5 text-white bg-black hover:bg-[#303030] rounded-lg"
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? "Илгээж байна..." : "Нэвтрэх"}
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
                        onClick={handleVerifyAndLogin}
                        disabled={loading || otp.length !== 6}
                        className="flex-1 cursor-pointer"
                      >
                        {loading ? "Баталгаажуулж байна..." : "Баталгаажуулах"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setOtpSent(false)}
                        className="flex-1 cursor-pointer"
                      >
                        Буцах
                      </Button>
                    </div>
                    <div className="text-sm text-center border-t pt-3 mt-2">
                      <Button
                        variant="link"
                        disabled={resendCooldown > 0 || loading}
                        onClick={handleResendOTP}
                        className="text-blue-500 cursor-pointer"
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
