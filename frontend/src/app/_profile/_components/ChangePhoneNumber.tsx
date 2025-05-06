"use client";

import { useUser } from "@/app/providers/UserProvider";
import { Formik, Form, Field } from "formik";
import { Phone } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

const ChangePhoneNumber = () => {
  const { userId, getUser } = useUser();

  return (
    <div className="w-full h-auto p-4 flex flex-col gap-4 bg-white rounded-lg">
      <h1 className="font-medium">Утасны дугаар шинэчлэх</h1>
      <Formik
        enableReinitialize
        initialValues={{
          phoneNumber: "",
        }}
        onSubmit={async (values) => {
          try {
            const response = await axios.put(
              `${process.env.NEXT_PUBLIC_BASE_URL}/user/updatePhoneNumber/${userId}`,
              {
                phoneNumber: values.phoneNumber,
              }
            );
            if (response.data.token) {
              localStorage.setItem("token", response.data.token);
            }

            await getUser();

            console.log("User phone number updated successfuly", response.data);
            toast.success("Утасны дугаар амжилттай шинэчлэгдлээ ");
          } catch (error) {
            console.log("Error in updating user information", error);
            toast.error("Утасны дугаартай хэрэглэгч бүртгэлтэй байна");
          }
        }}
      >
        {({ handleChange }) => (
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <Phone width={16} height={16} />
                <p className="font-medium text-[14px]">
                  Шинэчлэх утасны дугаараа оруулна уу{" "}
                </p>
              </div>
              <Field
                name="phoneNumber"
                as="input"
                className="w-full border-2 rounded-lg p-2"
                onChange={handleChange}
              />
            </div>

            <Button className="mt-2 bg-[#101010] text-white px-4 py-2 rounded-lg cursor-pointer  transition">
              Шинэчлэх
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePhoneNumber;
