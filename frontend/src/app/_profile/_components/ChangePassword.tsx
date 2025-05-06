"use client";

import { useUser } from "@/app/providers/UserProvider";
import { Formik, Form, Field } from "formik";
import { LockKeyhole, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { errorToJSON } from "next/dist/server/render";

const ChangePassword = () => {
  const { userId } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  console.log(userId);

  const PasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Одоогийн нууц үг шаардлагатай"),
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full h-auto p-4 flex flex-col gap-4 bg-white rounded-lg">
      <h1 className="font-medium">Нууц үг солих</h1>
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={PasswordSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            if (values.newPassword === values.currentPassword) {
              toast.error("Одоогийн нууц үг болон шинэ нууц үг адилхан байна");
              return;
            }
            if (values.newPassword !== values.confirmPassword) {
              toast.error("Нууц үг таарахгүй байна");
              return;
            }

            const response = await axios.put(
              `${process.env.NEXT_PUBLIC_BASE_URL}/user/updatePassword/${userId}`,
              {
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
              }
            );

            if (response.data.token) {
              localStorage.setItem("token", response.data.token);
            }

            console.log("update password", values);

            toast.success("Нууц үг амжилттай шинэчлэгдлээ");
            resetForm();
          } catch (error) {
            console.error("Error updating password:", error);
            const axiosError = error as AxiosError<{ message: string }>;
            const errorMessage = axiosError.response?.data?.message;
            if (errorMessage === "Current password is incorrect") {
              toast.error("Одоогийн нууц үг буруу байна");
            } else toast.error("Нууц үг солиход алаа гарлаа");
          }
        }}
      >
        {({ handleChange, errors, touched }) => (
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <LockKeyhole width={16} height={16} />
                <p className="font-medium text-[14px]">
                  Одоогийн нууц үгээ оруулна уу
                </p>
              </div>
              <div className="relative">
                <Field
                  name="currentPassword"
                  type={showPassword ? "text" : "password"}
                  as="input"
                  className="w-full border-2 rounded-lg p-2"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff width={18} height={18} />
                  ) : (
                    <Eye width={18} height={18} />
                  )}
                </button>
              </div>
              {errors.currentPassword && touched.currentPassword && (
                <div className="text-red-500 text-sm">
                  {errors.currentPassword}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <LockKeyhole width={16} height={16} />
                <p className="font-medium text-[14px]">
                  Шинэ нууц үгээ оруулна уу
                </p>
              </div>
              <div className="relative">
                <Field
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  as="input"
                  className="w-full border-2 rounded-lg p-2"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff width={18} height={18} />
                  ) : (
                    <Eye width={18} height={18} />
                  )}
                </button>
              </div>
              {errors.newPassword && touched.newPassword && (
                <div className="text-red-500 text-sm">{errors.newPassword}</div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <LockKeyhole width={16} height={16} />
                <p className="font-medium text-[14px]">
                  Шинэ нууц үгээ дахин оруулна уу
                </p>
              </div>
              <div className="relative">
                <Field
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  as="input"
                  className="w-full border-2 rounded-lg p-2"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff width={18} height={18} />
                  ) : (
                    <Eye width={18} height={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="text-red-500 text-sm">
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 bg-[#101010] text-white px-4 py-2 rounded-lg cursor-pointer transition"
            >
              Шинэчлэх
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
