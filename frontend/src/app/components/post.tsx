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

const Post = React.forwardRef(({ refreshFn,}: { refreshFn: () => void; loading?: boolean }, ref) => {
  const { userId } = useUser();
  const formikRef = useRef<FormikProps<{ trackingNumber: string }>>(null);

  useImperativeHandle(ref, () => ({
    submit: () => {
      formikRef.current?.submitForm();
    },
  }));

  return (
    <AlertDialog>
      <AlertDialogTrigger className="fixed bottom-20 z-50">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 border border-gray-400 shadow hover:bg-gray-300 transition-all">
          <Plus className="w-5 h-5 text-black" />
          <p className="text-sm text-black font-medium">Илгээмж бүртгэх</p>
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-800 text-lg font-semibold">
            Илгээмж бүртгэх
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 mt-2">
            <Formik
              innerRef={formikRef}
              initialValues={{ trackingNumber: "" }}
              validationSchema={Yup.object({
                trackingNumber: Yup.string().required("Илгээмжийн дугаар шаардлагатай"),
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
                    err.response?.data?.message === "Энэ хяналтын дугаар бүртгэгдсэн байна"
                      ? "❌ Энэ хяналтын дугаар бүртгэгдсэн байна!"
                      : "❌ Илгээмж бүртгэхэд алдаа гарлаа!";
                  toast.error(message);
                }
              }}
            >
              {({ errors, touched }) => (
                <Form className="flex items-center mt-2">
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
                </Form>
              )}
            </Formik>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Гарах</AlertDialogCancel>
          <AlertDialogAction onClick={() => formikRef.current?.submitForm()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

Post.displayName = "Post";

export default Post;
