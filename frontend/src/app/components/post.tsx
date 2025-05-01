import { useState } from "react";
import axios from "axios";
import { AxiosError } from "axios";
import { useUser } from "../providers/UserProvider";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";

export const Post = ({
  refreshFn,
  loading,
}: {
  refreshFn: () => void;
  loading: boolean;
}) => {
  const [select, setSelect] = useState(true);
  const { userId } = useUser();

  const handleSelect = () => {
    setSelect(false);
  };

  return (
    <div className="w-full flex gap-4 overflow-hidden">
      {/* Left Panel */}
      <div
        className={`bg-gray-100 p-4 rounded-xl border border-gray-200 cursor-pointer transform transition-all duration-500 ease-in-out ${
          select ? "w-1/2" : "w-full"
        }`}
        onClick={select ? handleSelect : undefined}
      >
        <p className="text-sm font-semibold text-red-600 flex justify-between items-center">
          Илгээмж бүртгэх
          {select && <button className="text-gray-400 text-xl">›</button>}
        </p>

        {/* Input Form */}
        {!select && (
          <Formik
            initialValues={{ trackingNumber: "" }}
            validationSchema={Yup.object({
              trackingNumber: Yup.string().required(
                "Илгээмжийн дугаар шаардлагатай"
              ),
            })}
            onSubmit={async (values, { resetForm }) => {
              try {
                const response = await axios.post(
                  `${process.env.NEXT_PUBLIC_BASE_URL}/truckItems`,
                  {
                    userId,
                    trackingNumber: values.trackingNumber,
                  }
                );
                console.log("Submitted tracking:", response.data);
                toast.success("✅ Илгээмж амжилттай бүртгэгдлээ!", {
                  position: "top-right",
                  autoClose: 5000,
                });
                resetForm();
                setSelect(true);
                refreshFn();
              } catch (error) {
                const err = error as AxiosError<{ message?: string }>;
                const message =
                  err.response?.data?.message === "Энэ хяналтын дугаар бүртгэгдсэн байна"
                    ? "❌ Энэ хяналтын дугаар бүртгэгдсэн байна!"
                    : "❌ Илгээмж бүртгэхэд алдаа гарлаа!";
              
                toast.error(message, {
                  position: "top-right",
                  autoClose: 5000,
                });
              }
              
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="items-center mt-2 flex transition-all duration-500">
                <span className="text-gray-500 mr-2">📦</span>
                <Field
                  name="trackingNumber"
                  type="text"
                  placeholder="Илгээмжийн дугаар бичих"
                  className={`flex-1 p-2 border ${
                    touched.trackingNumber && errors.trackingNumber
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg text-gray-700`}
                />
                <button
                  type="submit"
                  className="ml-2 px-3 py-2 bg-red-500 text-white rounded-lg"
                  disabled={loading || isSubmitting}
                >
                  {loading || isSubmitting ? (
                    <div className="w-5 h-5 border-l-[2px] border-t-[2px] border-white rounded-full animate-spin" />
                  ) : (
                    "➤"
                  )}
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>

      {/* Right Panel */}
      <div
        className={`bg-red-100 p-4 rounded-xl transition-all duration-500 ease-in-out ${
          select
            ? "w-1/2 opacity-100 translate-x-0 flex"
            : "w-0 opacity-0 translate-x-4 hidden"
        } items-center justify-between`}
      >
        <span className="text-red-600 font-semibold text-lg">
          📍 Хүргэлтүүд
        </span>
        <button className="text-gray-400 text-xl">›</button>
      </div>
    </div>
  );
};

export default Post;
