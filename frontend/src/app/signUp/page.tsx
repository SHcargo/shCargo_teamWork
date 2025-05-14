/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useRouter } from "next/navigation";
import { PhoneCallIcon, LockKeyhole, User, Mail } from "lucide-react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useEffect, useState } from "react";
import SkeletonTable from "../dashboard/components/(features)/skeleton";
import TermsOfViewForUser from "./feautures/termsOfView";
import Logo from "@/components/ui/logoSh";

interface Term {
  _id: string;
  condition: string;
  registration: string;
  price: string;
  payment: string;
  shipping: string;
  deliver: string;
  deliverPrice: string;
  forbidden: string;
  responsibility: string;
  loss: string;
  isVerified: boolean;
}

const registerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Нэрээ оруулна уу")
    .min(2, "Нэр хамгийн багадаа 2 тэмдэгт байх ёстой")
    .max(50, "Нэр хамгийн ихдээ 50 тэмдэгт байх ёстой"),
  email: Yup.string()
    .required("Имэйл хаяг оруулна уу")
    .email("Буруу имэйл хаяг байна"),
  phoneNumber: Yup.string()
    .required("Утасны дугаар оруулна уу")
    .matches(/^[0-9]{8}$/, "Утасны дугаар яг 8 оронтой байх ёстой"),
  password: Yup.string()
    .required("Нууц үг оруулна уу")
    .min(6, "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой")
    .max(32, "Нууц үг хамгийн ихдээ 32 тэмдэгт байх ёстой")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
      "Нууц үг нь нэг том үсэг, нэг тоо, нэг тусгай тэмдэгт агуулсан байх ёстой"
    ),
  confirmPassword: Yup.string()
    .required("Нууц үг баталгаажуулна уу")
    .oneOf([Yup.ref("password")], "Нууц үг таарахгүй байна"),
});

const SubmitDrawerButton = () => {
  const { submitForm } = useFormikContext();
  return (
    <Button type="button" className="cursor-pointer" onClick={submitForm}>
      Зөвшөөрсөн
    </Button>
  );
};

const Register = () => {
  const router = useRouter();
  const [terms, setTerms] = useState<Term[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

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

  const fetchingTerms = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/terms`
      );
      setTerms(response.data.message);
    } catch (error) {
      console.error("Error fetching terms", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingTerms();
  }, []);

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
          validationSchema={registerValidationSchema}
          onSubmit={async (values) => {
            try {
              setOtpLoading(true);
              await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/otp/send`, {
                email: values.email,
                purpose: "signup",
              });
              setOtpEmail(values.email);
              setOtpSent(true);
              setDrawerOpen(false);
              toast.info("📧 Таны имэйл рүү баталгаажуулах код илгээгдлээ!");
            } catch (error) {
              toast.error("OTP илгээхэд алдаа гарлаа.");
              console.log(error);
            } finally {
              setOtpLoading(false);
            }
          }}
        >
          {(formik) => (
            <>
              <Form className="flex flex-col gap-5">
                <div className="flex justify-center">
                  <Logo className="w-24 h-24 bg-black rounded-2xl" />
                </div>
                <h1 className="font-semibold text-center">
                  Шинэ хэрэглэгчийн бүртгэл
                </h1>

                {/* Name */}
                <div>
                  <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex">
                    <div className="w-12 flex justify-center items-center">
                      <User />
                    </div>
                    <Field
                      name="name"
                      placeholder="Нэрээ оруулна уу"
                      className="w-full h-full text-black px-3 py-0.5"
                    />
                  </div>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm ml-2"
                  />
                </div>

                {/* Email */}
                <div>
                  <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex">
                    <div className="w-12 flex justify-center items-center">
                      <Mail />
                    </div>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Имэйл хаяг"
                      className="w-full h-full text-black px-3 py-0.5"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm ml-2"
                  />
                </div>

                {/* Phone */}
                <div>
                  <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex">
                    <div className="w-12 flex justify-center items-center">
                      <PhoneCallIcon />
                    </div>
                    <Field
                      name="phoneNumber"
                      placeholder="Утасны дугаар"
                      className="w-full h-full text-black px-3 py-0.5"
                      type="tel"
                    />
                  </div>
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500 text-sm ml-2"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex">
                    <div className="w-12 flex justify-center items-center">
                      <LockKeyhole />
                    </div>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Нууц үг"
                      className="w-full h-full text-black px-3 py-0.5"
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm ml-2"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex">
                    <div className="w-12 flex justify-center items-center">
                      <LockKeyhole />
                    </div>
                    <Field
                      name="confirmPassword"
                      type="password"
                      placeholder="Нууц үгээ баталгаажуулна уу"
                      className="w-full h-full text-black px-3 py-0.5"
                    />
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm ml-2"
                  />
                </div>

                {/* Open Drawer Button */}
                <div
                  className="cursor-pointer px-6 py-3 hover:bg-gray-500 font-semibold justify-center rounded-lg bg-gray-900 flex text-xl text-white"
                  onClick={async () => {
                    const errors = await formik.validateForm();
                    formik.setTouched({
                      name: true,
                      email: true,
                      phoneNumber: true,
                      password: true,
                      confirmPassword: true,
                    });
                    if (Object.keys(errors).length === 0) {
                      setDrawerOpen(true);
                    }
                  }}
                >
                  Бүртгүүлэх
                </div>
              </Form>

              {/* Drawer */}
              <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>
                      Та манай үйлчилгээний нөхцөлийг зөвшөөрч байна уу ?
                    </DrawerTitle>
                    {!loading && terms.length > 0 ? (
                      <DrawerDescription>
                        <TermsOfViewForUser term={terms[0]} />
                      </DrawerDescription>
                    ) : loading ? (
                      <SkeletonTable />
                    ) : (
                      <DrawerDescription>Нөхцөл олдсонгүй</DrawerDescription>
                    )}
                  </DrawerHeader>
                  <DrawerFooter>
                    <SubmitDrawerButton />
                    <DrawerClose asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="cursor-pointer"
                      >
                        Буцах
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>

              {/* OTP Modal */}
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
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/[^\d]/g, "").slice(0, 6))
                      }
                      placeholder="6 оронтой код"
                      className="border p-2 rounded w-full mb-4"
                      maxLength={6}
                    />

                    <div className="flex gap-2">
                      <Button
                        onClick={async () => {
                          try {
                            setOtpLoading(true);
                            await axios.post(
                              `${process.env.NEXT_PUBLIC_BASE_URL}/signUp`,
                              {
                                email: otpEmail,
                                password: formik.values.confirmPassword,
                                phoneNumber: formik.values.phoneNumber,
                                name: formik.values.name,
                                otp: otp,
                              }
                            );
                            toast.success(
                              "✅ Хэрэглэгч амжилттай бүртгэгдлээ!"
                            );
                            setOtpSent(false);
                            router.push("/logIn");
                          } catch (error) {
                            toast.error("OTP баталгаажуулахад алдаа гарлаа.");
                          } finally {
                            setOtpLoading(false);
                          }
                        }}
                        disabled={otpLoading || otp.length !== 6}
                        className="cursor-pointer flex-1"
                      >
                        Баталгаажуулах
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => setOtpSent(false)}
                        className="cursor-pointer flex-1"
                      >
                        Буцах
                      </Button>
                    </div>

                    <div className="text-sm text-center mt-4 border-t pt-4">
                      <Button
                        variant="link"
                        disabled={resendCooldown > 0 || otpLoading}
                        onClick={async () => {
                          try {
                            setOtpLoading(true);
                            await axios.post(
                              `${process.env.NEXT_PUBLIC_BASE_URL}/otp/send`,
                              { email: otpEmail, purpose: "signup" }
                            );
                            toast.info("📧 Шинэ код илгээгдлээ!");
                            startResendCooldown();
                          } catch (error) {
                            toast.error("Код дахин илгээхэд алдаа гарлаа!");
                            console.error(error);
                          } finally {
                            setOtpLoading(false);
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
              )}
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
