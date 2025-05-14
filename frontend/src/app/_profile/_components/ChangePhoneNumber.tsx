"use client";

import { useState } from "react";
import { useUser } from "@/app/providers/UserProvider";
import { Formik, Form, Field } from "formik";
import { Phone } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import { useNotification } from "@/app/providers/NotificationProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const PhoneNumberSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("Утасны дугаар оруулна уу")
    .matches(/^[0-9]{8}$/, "Утасны дугаар 8 оронтой тоо байх ёстой"),
});

const ChangePhoneNumber = () => {
  const { userId, userEmail, getUser } = useUser();
  const { getNotification } = useNotification();
  const [otp, setOtp] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submittedPhone, setSubmittedPhone] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(userEmail);

  return (
    <div className="w-full h-auto p-4 cursor-default flex flex-col gap-4 bg-white rounded-lg">
      <h1 className="font-medium">Утасны дугаар шинэчлэх</h1>
      <Formik
        initialValues={{ phoneNumber: "" }}
        validationSchema={PhoneNumberSchema}
        onSubmit={async (values) => {
          try {
            setLoading(true);
            const sendOtp = await axios.post(
              `${process.env.NEXT_PUBLIC_BASE_URL}/otp/send`,
              {
                email: userEmail,
                purpose: "change_phone",
              }
            );

            setSubmittedPhone(values.phoneNumber);
            setDialogOpen(true);
            console.log(sendOtp);
            setLoading(false);
            if (sendOtp.data.success) {
              toast.success("Нэг удаагийн нууц үг илгээгдлээ");
            }
          } catch (error) {
            console.log(error);
            toast.error("OTP илгээхэд алдаа гарлаа");
          }
        }}
      >
        {({ errors, touched, handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Phone width={16} height={16} />
                <p className="font-medium text-[14px]">
                  Шинэчлэх утасны дугаараа оруулна уу
                </p>
              </div>
              <Field
                name="phoneNumber"
                as="input"
                className="w-full border-2 rounded-lg p-2"
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 bg-[#101010] text-white px-4 py-2 rounded-lg cursor-pointer transition"
            >
              {loading ? "Илгээж байна..." : "Шинэчлэх"}
            </button>
          </Form>
        )}
      </Formik>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Нэг удаагийн нууц код баталгаажуулалт</DialogTitle>
            <DialogDescription>
              Бүртгэлтэй мэйл хаягт илгээсэн нууц кодыг оруулна уу
            </DialogDescription>
          </DialogHeader>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="w-full border-2 rounded-lg p-2 mt-2"
            placeholder="6 оронтой код"
          />

          <Button
            onClick={async () => {
              try {
                const response = await axios.put(
                  `${process.env.NEXT_PUBLIC_BASE_URL}/user/updatePhoneNumber/${userId}`,
                  {
                    email: userEmail,
                    phoneNumber: submittedPhone, // use phoneNumber, not newPhone
                    otp: otp,
                  }
                );

                localStorage.setItem("token", response.data.token);
                await getUser();
                await getNotification();
                toast.success("Утасны дугаар амжилттай шинэчлэгдлээ");
                setDialogOpen(false);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
              } catch (error: any) {
                toast.error(
                  error?.response?.data?.message ||
                    "OTP баталгаажуулалт амжилтгүй боллоо"
                );
              }
            }}
            className="w-full mt-4"
          >
            Баталгаажуулах
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChangePhoneNumber;
