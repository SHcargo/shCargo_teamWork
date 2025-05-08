"use client";

import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, PhoneCallIcon, LockIcon } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const phoneValidationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("Утасны дугаар оруулна уу")
    .matches(/^[0-9]{8}$/, "Утасны дугаар 8 оронтой тоо байх ёстой"),
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

  const toggleVisibility = () => setShowPassword((prev) => !prev);
  console.log(userId);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[rgb(221,221,221)]">
      <Formik
        initialValues={{
          phoneNumber: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={
          step === "verify" ? phoneValidationSchema : passwordValidationSchema
        }
        onSubmit={async (values) => {
          if (step === "verify") {
            try {
              const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/user/findByPhoneNumber`,
                {
                  phoneNumber: values.phoneNumber,
                }
              );

              if (response.data.success) {
                setStep("reset");
                console.log(response);
                setUserId(response.data.user._id);
              }
            } catch (error) {
              console.error("Алдаа гарлаа", error);

              if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 404) {
                  toast.error("Энэ дугаартай хэрэглэгч бүртгэлгүй байна");
                } else {
                  toast.error("Алдаа гарлаа. Дахин оролдоно уу.");
                }
              } else {
                toast.error(
                  "Серверт алдаа гарлаа та түр хүлээгээд дахин оролдоно уу."
                );
              }
            }
          } else if (step === "reset") {
            try {
              const response = await axios.put(
                `${process.env.NEXT_PUBLIC_BASE_URL}/user/resetPassword/${userId}`,
                {
                  newPassword: values.newPassword,
                }
              );

              if (response.data.success) {
                toast.success("Нууц үг амжилттай шинэчлэгдлээ");
                router.push("/logIn");
              }
            } catch (error) {
              console.error("Нууц үг шинэчлэхэд алдаа гарлаа", error);
              toast.error(
                "Нууц үг шинэчлэхэд алдаа гарлаа. Дахин оролдоно уу."
              );
            }
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="max-w-md w-full bg-[#e9ecef] p-6 rounded-xl shadow-lg flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">
              {step === "verify"
                ? "Бүртгэлтэй утасны дугаараа оруулна уу"
                : "Шинэ нууц үгээ оруулна уу"}
            </h2>

            {step === "verify" && (
              <div className="flex flex-col gap-1">
                <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex items-center overflow-hidden">
                  <div className="w-12 flex justify-center items-center">
                    <PhoneCallIcon className="w-5 h-5 text-gray-500" />
                  </div>
                  <Field
                    name="phoneNumber"
                    type="text"
                    placeholder="Утасны дугаар"
                    className="flex-1 px-3 py-2 outline-none"
                  />
                </div>
                {errors.phoneNumber && touched.phoneNumber && (
                  <div className="text-red-500 text-sm">
                    {errors.phoneNumber}
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
              className="py-2 bg-[#303030] cursor-pointer text-white font-semibold rounded-lg text-lg"
            >
              {step === "verify" ? "Үргэлжлүүлэх" : "Шинэчлэх"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
