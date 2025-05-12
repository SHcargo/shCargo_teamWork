/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useRouter } from "next/navigation";
import Logo from "../ui/Logo";
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
    <Button type="button" onClick={submitForm}>
      Зөвшөөрсөн
    </Button>
  );
};

const Register = () => {
  const router = useRouter();
  const [terms, setTerms] = useState<Term[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
              await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/signUp`, {
                email: values.email,
                password: values.confirmPassword,
                phoneNumber: values.phoneNumber,
                name: values.name,
              });
              toast.success("✅ Хэрэглэгч амжилттай бүртгэгдлээ!");
              router.push("/logIn");
            } catch (error) {
              console.error("Registration error:", error);
              toast.error("😕 Хэрэглэгч бүртгэхэд алдаа гарлаа.");
            }
          }}
        >
          {(formik) => (
            <>
              <Form className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <Logo />
                  <h1 className="text-[#5F2DF5] text-2xl font-semibold">
                    SH Cargo
                  </h1>
                </div>

                {/* Name Field */}
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

                {/* Email Field */}
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

                {/* Phone Number */}
                <div>
                  <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex">
                    <div className="w-12 flex justify-center items-center">
                      <PhoneCallIcon />
                    </div>
                    <Field
                      name="phoneNumber"
                      placeholder="Утасны дугаар"
                      className="w-full h-full text-black px-3 py-0.5"
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

                {/* Custom Drawer Trigger */}
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
                  бүртгүүлэх
                </div>
              </Form>

              {/* Drawer */}
              <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>
                      Та бүртгүүлэхдээ итгэлтэй байна уу?
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
                      <Button type="button" variant="outline">
                        Буцах
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
