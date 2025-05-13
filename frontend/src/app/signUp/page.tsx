"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

const RegistrationSchema = Yup.object().shape({
  email: Yup.string()
    .email("И-мэйл буруу байна")
    .required("И-мэйл шаардлагатай"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{8}$/, "Утасны дугаар 8 оронтой байх ёстой")
    .required("Утасны дугаар шаардлагатай"),
  name: Yup.string().required("Нэр шаардлагатай"),
  password: Yup.string()
    .min(6, "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой")
    .required("Нууц үг шаардлагатай"),
});

const RegisterWithOtp = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [otp, setOtp] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [submittedValues, setSubmittedValues] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [otpSending, setOtpSending] = useState(false);

  // Send OTP and open dialog
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSendOtp = async (email: string, values: any) => {
    try {
      setOtpSending(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/otp/send`,
        {
          email,
          purpose: "signup",
        }
      );
      if (res.data.success) {
        toast.success("OTP амжилттай илгээгдлээ");
        setSubmittedValues(values);
        setDialogOpen(true);
      } else {
        toast.error(res.data.message || "OTP илгээхэд алдаа гарлаа");
      }
    } catch (error) {
      toast.error("OTP илгээхэд алдаа гарлаа");
      console.log(error);
    } finally {
      setOtpSending(false);
    }
  };

  // Verify OTP and register user
  const handleVerifyAndRegister = async () => {
    if (!submittedValues) {
      toast.error("Бүртгэлийн мэдээлэл олдсонгүй");
      return;
    }
    if (otp.length !== 6) {
      toast.error("6 оронтой OTP код оруулна уу");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/signUp`,
        {
          ...submittedValues,
          otp,
        }
      );
      if (res.data.success) {
        toast.success("Амжилттай бүртгэгдлээ");
        setDialogOpen(false);
        setOtp("");
        setSubmittedValues(null);
      } else {
        toast.error(res.data.message || "Бүртгэл амжилтгүй боллоо");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Бүртгэл амжилтгүй боллоо");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-center">Бүртгүүлэх</h2>

      <Formik
        initialValues={{ email: "", phoneNumber: "", name: "", password: "" }}
        validationSchema={RegistrationSchema}
        onSubmit={(values) => handleSendOtp(values.email, values)}
      >
        {({ errors, touched, handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 font-medium">И-мэйл</label>
              <Field
                name="email"
                type="email"
                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#101010]"
              />
              {errors.email && touched.email && (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Утасны дугаар</label>
              <Field
                name="phoneNumber"
                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#101010]"
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber}
                </div>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Нэр</label>
              <Field
                name="name"
                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#101010]"
              />
              {errors.name && touched.name && (
                <div className="text-red-500 text-sm mt-1">{errors.name}</div>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Нууц үг</label>
              <Field
                name="password"
                type="password"
                className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#101010]"
              />
              {errors.password && touched.password && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={otpSending}
              className="mt-4 bg-[#101010] text-white px-4 py-2 rounded-lg cursor-pointer transition disabled:opacity-50"
            >
              {otpSending ? "OTP илгээж байна..." : "OTP илгээх"}
            </button>
          </Form>
        )}
      </Formik>

      {/* OTP Verification Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>OTP Баталгаажуулалт</DialogTitle>
            <DialogDescription>
              И-мэйл рүү илгээсэн 6 оронтой OTP кодыг оруулна уу
            </DialogDescription>
          </DialogHeader>

          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="w-full border-2 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-[#101010]"
            placeholder="6 оронтой OTP код"
          />

          <Button
            onClick={handleVerifyAndRegister}
            disabled={loading}
            className="w-full mt-4"
          >
            {loading ? "Баталгаажуулж байна..." : "Баталгаажуулах"}
          </Button>

          <Dialog>
            <DialogClose>
              <div
                className="mt-2 w-full text-center text-gray-600 underline"
                onClick={() => {
                  setDialogOpen(false);
                  setOtp("");
                }}
              >
                Буцах
              </div>
            </DialogClose>
          </Dialog>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegisterWithOtp;
