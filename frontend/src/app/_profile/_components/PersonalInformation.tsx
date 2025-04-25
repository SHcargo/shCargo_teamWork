"use client";

import { useUser } from "@/app/providers/UserProvider";
import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import { User, Phone } from "lucide-react";
import axios from "axios";

const PersonalInformation = () => {
  const { userId, name, phoneNumber, getUser } = useUser();
  const [showButton, setShowButton] = useState(false);

  return (
    <div className="w-full h-auto p-4 flex flex-col gap-4 bg-white rounded-lg">
      <h1 className="font-medium">Таний хувийн мэдээлэл</h1>
      <Formik
        enableReinitialize
        initialValues={{
          name: name || "",
          phoneNumber: phoneNumber || "",
        }}
        onSubmit={async (values) => {
          setShowButton(false);
          try {
            const response = await axios.put(
              `${process.env.NEXT_PUBLIC_BASE_URL}/user/${userId}`,
              {
                name: values.name,
                phoneNumber: values.phoneNumber,
              }
            );
            getUser();
            console.log("User information updated successfully", response.data);
          } catch (error) {
            console.log("Error in updating user information", error);
          }
        }}
      >
        {({ values, initialValues, handleChange }) => {
          useEffect(() => {
            const hasChanged =
              values.name !== initialValues.name ||
              values.phoneNumber !== initialValues.phoneNumber;
            setShowButton(hasChanged);
          }, [values, initialValues]);

          return (
            <Form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <User width={16} height={16} />
                  <p className="font-medium text-[14px]">Таний нэр</p>
                </div>
                <Field
                  name="name"
                  as="input"
                  className="w-full border-2 rounded-lg p-2"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <Phone width={16} height={16} />
                  <p className="font-medium text-[14px]">Таний утсаны дугаар</p>
                </div>
                <Field
                  name="phoneNumber"
                  as="input"
                  className="w-full border-2 rounded-lg p-2"
                  onChange={handleChange}
                />
              </div>
              {showButton && (
                <button
                  type="submit"
                  className="mt-2 bg-[#5F2DF5] text-white px-4 py-2 rounded-lg  transition"
                >
                  Хадгалах
                </button>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PersonalInformation;
