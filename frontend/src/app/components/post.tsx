import React, { useImperativeHandle, useRef } from "react";
import axios, { AxiosError } from "axios";
import { useUser } from "../providers/UserProvider";
import * as Yup from "yup";
import { Formik, Form, Field, FormikHelpers, FormikProps } from "formik";
import { toast } from "react-toastify";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Plus } from "lucide-react";

const Post = React.forwardRef(
  ({ refreshFn }: { refreshFn: () => void; loading?: boolean }, ref) => {
    const { userId } = useUser();
    const formikRef = useRef<FormikProps<{ trackingNumber: string }>>(null);

    useImperativeHandle(ref, () => ({
      submit: () => {
        formikRef.current?.submitForm();
      },
    }));

    return (
      <div className="w-full max-w-2xl fixed bottom-20 flex justify-end px-4 z-50">
        <AlertDialog>
          <AlertDialogTrigger>
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-400 
             bg-gray-100 text-black shadow-md hover:shadow-lg hover:bg-gray-300 
             active:scale-[0.98] transition-all duration-200 ease-in-out
             dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
            >
              <Plus className="w-5 h-5" />
              <p className="text-sm font-medium">Илгээмж бүртгэх</p>
            </div>
          </AlertDialogTrigger>

          <AlertDialogContent className="w-full max-w-md mx-auto p-4 sm:p-6">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-gray-800 text-lg font-semibold">
                Илгээмж бүртгэх
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 mt-4">
                <Formik
                  innerRef={formikRef}
                  initialValues={{ trackingNumber: "" }}
                  validationSchema={Yup.object({
                    trackingNumber: Yup.string().required(
                      "Илгээмжийн дугаар шаардлагатай"
                    ),
                  })}
                  onSubmit={async (
                    values: { trackingNumber: string },
                    { resetForm }: FormikHelpers<{ trackingNumber: string }>
                  ) => {
                    try {
                      await axios.post(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/truckItems`,
                        {
                          userId,
                          trackingNumber: values.trackingNumber,
                        }
                      );
                      toast.success("✅ Илгээмж амжилттай бүртгэгдлээ!");
                      resetForm();
                      refreshFn();
                    } catch (error) {
                      const err = error as AxiosError<{ message?: string }>;
                      const message =
                        err.response?.data?.message ===
                        "Энэ хяналтын дугаар бүртгэгдсэн байна"
                          ? "❌ Энэ хяналтын дугаар бүртгэгдсэн байна!"
                          : "❌ Илгээмж бүртгэхэд алдаа гарлаа!";
                      toast.error(message);
                    }
                  }}
                >
                  {({ errors, touched }) => (
                    <Form className="mt-2 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">📦</span>
                        <Field
                          name="trackingNumber"
                          type="text"
                          placeholder="Илгээмжийн дугаар бичих"
                          className={`flex-1 p-2 border ${
                            touched.trackingNumber && errors.trackingNumber
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-lg text-gray-700 w-full`}
                        />
                      </div>
                      {touched.trackingNumber && errors.trackingNumber && (
                        <p className="text-sm text-red-500">
                          {errors.trackingNumber}
                        </p>
                      )}
                    </Form>
                  )}
                </Formik>
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel>Гарах</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => formikRef.current?.submitForm()}
              >
                Үргэлжлүүлэх
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }
);

Post.displayName = "Post";

export default Post;
