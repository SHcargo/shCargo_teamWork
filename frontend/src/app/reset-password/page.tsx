"use client";

import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, LockIcon, Mail } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const emailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Зөв имэйл хаяг оруулна уу")
    .required("Имэйл хаяг шаардлагатай"),
});

const passwordValidationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой")
    .required("Шинэ нууц үг шаардлагатай")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
      "Нууц үг нь нэг том үсэг, нэг тоо, нэг тусгай тэмдэгт агуулсан байх ёстой"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Нууц үг таарахгүй байна")
    .required("Нууц үгээ давтан оруулна уу"),
});

const ResetPassword = () => {
  const [step, setStep] = useState<"verify" | "reset">("verify");
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState("");
  const router = useRouter();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  // Cooldown timer for resend button
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

  // Resend OTP handler
  const handleResendOTP = async () => {
    if (resendCooldown > 0 || loading) return;
    try {
      setLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/otp/send`, {
        email: otpEmail,
        purpose: "reset_password",
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

  // Toggle password visibility
  const toggleVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[rgb(221,221,221)]">
      <Formik
        initialValues={{
          email: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={
          step === "verify" ? emailValidationSchema : passwordValidationSchema
        }
        onSubmit={async (values) => {
          if (step === "verify") {
            try {
              setLoading(true);
              // 1. Send OTP
              await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/otp/send`, {
                email: values.email,
                purpose: "reset_password",
              });

              setOtpEmail(values.email);
              setOtpSent(true);
              startResendCooldown();
              toast.info("📧 Таны имэйл рүү баталгаажуулах код илгээгдлээ!");

              // 2. Find user by email to get userId
              const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/user/findByEmail`,
                { email: values.email }
              );

              if (response.data.success) {
                setStep("reset");
                setUserId(response.data.user._id);
              } else {
                toast.error("Энэ майл хаягтай хэрэглэгч бүртгэлгүй байна");
              }
            } catch (error) {
              console.error("Алдаа гарлаа", error);
              if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 404) {
                  toast.error("Энэ майл хаягтай хэрэглэгч бүртгэлгүй байна");
                } else {
                  toast.error("Алдаа гарлаа. Дахин оролдоно уу.");
                }
              } else {
                toast.error(
                  "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу."
                );
              }
            } finally {
              setLoading(false);
            }
          } else if (step === "reset") {
            try {
              setLoading(true);
              // Only call the reset password endpoint, which will check the OTP
              const response = await axios.put(
                `${process.env.NEXT_PUBLIC_BASE_URL}/user/resetPassword/${userId}`,
                {
                  newPassword: values.newPassword,
                  otp: otp,
                  email: otpEmail,
                }
              );

              if (response.data.success) {
                toast.success("Нууц үг амжилттай шинэчлэгдлээ");
                router.push("/logIn");
              } else {
                toast.error(
                  "Нууц үг шинэчлэхэд алдаа гарлаа. Дахин оролдоно уу."
                );
              }
            } catch (error) {
              console.error("Нууц үг шинэчлэхэд алдаа гарлаа", error);
              if (axios.isAxiosError(error)) {
                toast.error(
                  error.response?.data?.message ||
                    "Нэг удаагийн нууц үг буруу байна"
                );
              } else {
                toast.error(
                  "Нууц үг шинэчлэхэд алдаа гарлаа. Дахин оролдоно уу."
                );
              }
            } finally {
              setLoading(false);
            }
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="max-w-md w-full bg-[#e9ecef] p-6 rounded-xl shadow-lg flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">
              {step === "verify"
                ? "Бүртгэлтэй имэйл хаягаа оруулна уу"
                : "Шинэ нууц үгээ оруулна уу"}
            </h2>

            {step === "verify" && (
              <div className="flex flex-col gap-1">
                <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex items-center overflow-hidden">
                  <div className="w-12 flex justify-center items-center">
                    <Mail className="w-5 h-5 text-gray-500" />
                  </div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Мэйл хаяг"
                    className="flex-1 px-3 py-2 outline-none"
                  />
                </div>
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>
            )}

            {otpSent && (
              <div className="flex flex-col gap-1">
                <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex items-center overflow-hidden">
                  <div className="w-12 flex justify-center items-center">
                    <LockIcon className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Баталгаажуулах 6 оронтой код"
                    className="flex-1 px-3 py-2 outline-none"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/[^\d]/g, "")
                        .slice(0, 6);
                      setOtp(value);
                    }}
                  />
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
                {otp.length !== 6 && step === "reset" && (
                  <div className="text-red-500 text-sm">
                    6 оронтой код оруулна уу
                  </div>
                )}
              </div>
            )}

            {step === "reset" && (
              <div className="flex flex-col gap-2">
                <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex items-center overflow-hidden">
                  <div className="w-12 flex justify-center items-center">
                    <LockIcon className="w-5 h-5 text-gray-500" />
                  </div>
                  <Field
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Шинэ нууц үг"
                    className="flex-1 px-3 py-2 outline-none"
                  />
                  <button
                    type="button"
                    onClick={toggleVisibility}
                    className="pr-3 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff size={18} cursor={"pointer"} />
                    ) : (
                      <Eye size={18} cursor={"pointer"} />
                    )}
                  </button>
                </div>
                {errors.newPassword && touched.newPassword && (
                  <div className="text-red-500 text-sm">
                    {errors.newPassword}
                  </div>
                )}
                <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex items-center overflow-hidden">
                  <div className="w-12 flex justify-center items-center">
                    <LockIcon className="w-5 h-5 text-gray-500" />
                  </div>
                  <Field
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Нууц үгээ давтан оруулна"
                    className="flex-1 px-3 py-2 outline-none"
                  />
                  <button
                    type="button"
                    onClick={toggleVisibility}
                    className="pr-3 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff size={18} cursor={"pointer"} />
                    ) : (
                      <Eye size={18} cursor={"pointer"} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || (step === "reset" && otp.length !== 6)}
              className="py-2 bg-[#303030] cursor-pointer text-white font-semibold rounded-lg text-lg"
            >
              {loading ? "Илгээж байна..." : "Үргэлжлүүлэх"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
