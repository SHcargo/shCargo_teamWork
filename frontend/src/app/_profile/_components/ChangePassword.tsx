"use client";

import { useUser } from "@/app/providers/UserProvider";
import { Formik, Form, Field } from "formik";
import { LockKeyhole, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { useNotification } from "@/app/providers/NotificationProvider";

const ChangePassword = () => {
  const { userId } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const { getNotification } = useNotification();

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
    <div className="w-full h-auto cursor-default p-4 flex flex-col gap-4 bg-white rounded-lg">
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

            if (response.data.token && typeof window !== "undefined") {
              localStorage.setItem("token", response.data.token);
            }

            console.log("update password", values);

            toast.success("Нууц үг амжилттай шинэчлэгдлээ");
            await getNotification();

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
                    <EyeOff width={18} height={18} cursor={"pointer"} />
                  ) : (
                    <Eye width={18} height={18} cursor={"pointer"} />
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
                    <EyeOff width={18} height={18} cursor={"pointer"} />
                  ) : (
                    <Eye width={18} height={18} cursor={"pointer"} />
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
                    <EyeOff width={18} height={18} cursor={"pointer"} />
                  ) : (
                    <Eye width={18} height={18} cursor={"pointer"} />
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

// import React, { useState } from "react";
// import { useUser } from "@/app/providers/UserProvider";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { LockKeyhole, Eye, EyeOff } from "lucide-react";

// const ChangePassword = () => {
//   const { userId, userEmail } = useUser(); // Assume userEmail available here
//   const [showPassword, setShowPassword] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [otp, setOtp] = useState("");
//   console.log(userEmail);

//   // Validation schema for password fields
//   const PasswordSchema = Yup.object().shape({
//     currentPassword: Yup.string().required("Одоогийн нууц үг шаардлагатай"),
//     newPassword: Yup.string()
//       .min(6, "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой")
//       .required("Шинэ нууц үг шаардлагатай")
//       .matches(
//         /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
//         "Нууц үг нь нэг том үсэг, нэг тоо, нэг тусгай тэмдэгт агуулсан байх ёстой"
//       ),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("newPassword")], "Нууц үг таарахгүй байна")
//       .required("Нууц үгээ давтан оруулна уу"),
//   });

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   // Send OTP to user email for changing password
//   const sendOtp = async () => {
//     if (!userEmail) {
//       toast.error("Хэрэглэгчийн имэйл олдсонгүй");
//       return;
//     }
//     try {
//       setLoading(true);
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/otp/send`,
//         {
//           email: userEmail,
//           purpose: "change_password",
//         }
//       );
//       if (res.data.success) {
//         toast.success("OTP амжилттай илгээгдлээ");
//         setOtpSent(true);
//       } else {
//         toast.error(res.data.message || "OTP илгээхэд алдаа гарлаа");
//       }
//     } catch (error) {
//       toast.error("OTP илгээхэд алдаа гарлаа");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Submit handler for change password form
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const handleSubmit = async (values: any, { resetForm }: any) => {
//     if (!otp) {
//       toast.error("OTP код оруулна уу");
//       return;
//     }
//     if (values.newPassword === values.currentPassword) {
//       toast.error("Одоогийн нууц үг болон шинэ нууц үг адилхан байна");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.put(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/user/updatePassword/${userId}`,
//         {
//           currentPassword: values.currentPassword,
//           newPassword: values.newPassword,
//           otp,
//         }
//       );

//       if (res.data.success) {
//         toast.success("Нууц үг амжилттай шинэчлэгдлээ");
//         resetForm();
//         setOtp("");
//         setOtpSent(false);
//       } else {
//         toast.error(res.data.message || "Нууц үг шинэчлэхэд алдаа гарлаа");
//       }
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       const errorMessage = error.response?.data?.message;
//       if (errorMessage === "Current password is incorrect") {
//         toast.error("Одоогийн нууц үг буруу байна");
//       } else if (errorMessage === "Invalid OTP") {
//         toast.error("Буруу нэг удаагийн нууц код байна");
//       } else {
//         toast.error("Нууц үг шинэчлэхэд алдаа гарлаа");
//       }
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full  mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col gap-6">
//       <h1 className="font-medium">Нууц үг солих</h1>
//       {!otpSent && (
//         <div>
//           <p className="font-medium text-[14px]">Нэг удаагийн нууц код авах</p>
//           <button
//             onClick={sendOtp}
//             disabled={loading}
//             className="mt-2 bg-[#101010] text-white px-2 text-[16px] py-1 rounded-lg cursor-pointer  transition"
//           >
//             {loading ? "Илгээж байна..." : "Нууц код илгээх"}
//           </button>
//         </div>
//       )}

//       {otpSent && (
//         <div className="mb-6">
//           <label className="font-medium text-[14px]">OTP код</label>
//           <input
//             type="text"
//             maxLength={6}
//             value={otp}
//             onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
//             className="w-full border-2 rounded-lg p-2 mt-2  "
//             placeholder="6 оронтой код оруулна уу"
//             disabled={loading}
//           />
//         </div>
//       )}

//       <Formik
//         initialValues={{
//           currentPassword: "",
//           newPassword: "",
//           confirmPassword: "",
//         }}
//         validationSchema={PasswordSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ errors, touched }) => (
//           <Form className="flex flex-col gap-4">
//             <div className="flex flex-col gap-2">
//               <label className="font-medium text-[14px]">
//                 Одоогийн нууц үг
//               </label>
//               <div className="relative">
//                 <Field
//                   name="currentPassword"
//                   type={showPassword ? "text" : "password"}
//                   className="w-full border-2 rounded-lg p-2"
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="absolute right-3 top-3 cursor-pointer text-gray-500"
//                   tabIndex={-1}
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//               {errors.currentPassword && touched.currentPassword && (
//                 <div className="text-red-600 text-sm mt-1">
//                   {errors.currentPassword}
//                 </div>
//               )}
//             </div>

//             <div className="flex flex-col gap-2">
//               <label className="font-medium text-[14px]">Шинэ нууц үг</label>
//               <div className="relative flex justify-center items-center">
//                 <Field
//                   name="newPassword"
//                   type={showPassword ? "text" : "password"}
//                   className="w-full border-2 rounded-lg p-2"
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="absolute right-3 top-3 cursor-pointer text-gray-500"
//                   tabIndex={-1}
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//               {errors.newPassword && touched.newPassword && (
//                 <div className="text-red-600 text-sm mt-1">
//                   {errors.newPassword}
//                 </div>
//               )}
//             </div>

//             <div className="flex flex-col gap-2 ">
//               <label className="font-medium text-[14px]">
//                 Нууц үгээ давтан оруулна уу
//               </label>
//               <div className="relative items-center justify-center flex ">
//                 <Field
//                   name="confirmPassword"
//                   type={showPassword ? "text" : "password"}
//                   className="w-full border-2 rounded-lg p-2"
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="absolute right-3 top-3 cursor-pointer text-gray-500"
//                   tabIndex={-1}
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//               {errors.confirmPassword && touched.confirmPassword && (
//                 <div className="text-red-600 text-sm mt-1">
//                   {errors.confirmPassword}
//                 </div>
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={loading || !otpSent}
//               className="mt-2 bg-[#101010] text-white px-4 py-2 rounded-lg cursor-pointer  transition"
//             >
//               {loading ? "Шинэчилж байна..." : "Шинэчлэх"}
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default ChangePassword;
