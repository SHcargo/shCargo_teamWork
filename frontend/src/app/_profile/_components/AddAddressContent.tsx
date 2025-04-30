import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import TextareaField from "@/app/deliveryAddress/components/TextAreaField";
import { useUser } from "@/app/providers/UserProvider";
import { useDeliveryAddress } from "@/app/providers/DeliveryAddressProvider";
import axios from "axios";
import { Check } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import dynamic from "next/dynamic";

import { toast } from "react-toastify";
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
});
const AddAddressContent = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const { userId } = useUser();
  const { fetchAddresses } = useDeliveryAddress();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex flex-col gap-2">
          <p>Шинэ хаяг бүртгэх</p>
          <p className="text-[14px] text-gray-400">
            Доорх мэдээллийг бөглөнө үү
          </p>
        </DialogTitle>
        <DialogDescription />

        <Formik
          initialValues={{
            lat: 0,
            lng: 0,
            detail: "",
            userId: userId,
          }}
          onSubmit={async (values) => {
            try {
              const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/deliveryAddress/${userId}`,
                {
                  lat: values.lat,
                  lng: values.lng,
                  detail: values.detail,
                }
              );
              fetchAddresses();
              toast.success("Амжилттай шинэ хаяг нэмлээ!");

              console.log(
                "Delivery address created successfully",
                response.data
              );
            } catch (error) {
              console.log("Error in creating delivery address", error);
            }
          }}
        >
          {({ setFieldValue, values }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
              if (!navigator.geolocation) {
                setError("Geolocation is not supported");
                return;
              }

              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const { latitude, longitude } = position.coords;
                  setLocation({ lat: latitude, lng: longitude });
                  setFieldValue("lat", latitude);
                  setFieldValue("lng", longitude);
                },
                (err) => setError(err.message),
                {
                  enableHighAccuracy: true,
                  timeout: 5000,
                  maximumAge: 0,
                }
              );
            }, [setFieldValue]);

            return (
              <Form className="flex flex-col gap-2 mt-4">
                <p>
                  Таний байршил {values.lat} {values.lng}
                </p>
                <LeafletMap latitude={values.lat} longitude={values.lng} />

                <TextareaField
                  name="detail"
                  label="Дэлгэрэнгүй мэдээлэл (Хотхон, Баяр, Орц, Орцны код, Давхар, Тоот)"
                  placeholder="Дэлгэрэнгүй мэдээллээ оруулна уу"
                />
                <DialogClose asChild>
                  <button
                    type="submit"
                    className="bg-[#5F2DF5] flex px-1 py-2.5 items-center justify-center gap-2 rounded-lg"
                  >
                    <Check width={16} height={16} stroke="white" />
                    <p className="text-white font-semibold">Хадгалах</p>
                  </button>
                </DialogClose>
              </Form>
            );
          }}
        </Formik>
      </DialogHeader>
    </DialogContent>
  );
};

export default AddAddressContent;
