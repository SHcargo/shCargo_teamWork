"use client";

import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextareaField from "./TextAreaField";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import axios from "axios";
import { Check } from "lucide-react";
import { useUser } from "@/app/providers/UserProvider";
import { useDeliveryAddress } from "@/app/providers/DeliveryAddressProvider";

const validationSchema = Yup.object({
  city: Yup.string().required("Хот сонгоно уу"),
  district: Yup.string().required("Дүүрэг сонгоно уу"),
  khoroo: Yup.string().required("Хороо сонгоно уу"),
  detail: Yup.string().required("Дэлгэрэнгүй мэдээлэл шаардлагатай"),
});

const AddPinPointContent = () => {
  const [userLocation, setUserLocation] = useState<{
    lat: number | null;
    lng: number | null;
  }>({
    lat: null,
    lng: null,
  });

  const { userId } = useUser();
  const { fetchAddresses } = useDeliveryAddress();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Error getting location", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

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
            detail: "",
            userId: userId,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/deliveryAddress/${userId}`,
                {
                  lat: userLocation.lat,
                  lng: userLocation.lng,
                  detail: values.detail,
                }
              );
              fetchAddresses();
              console.log(
                "Delivery address created successfully",
                response.data
              );
            } catch (error) {
              console.log("Error in creating delivery address", error);
            }
          }}
        >
          {({}) => (
            <Form className="flex flex-col gap-2 mt-4">
              <TextareaField
                name="detail"
                label="Дэлгэрэнгүй мэдээлэл (Хотхон, Баяр, Орц, Орцны код, Давхар, Тоот)"
                placeholder="Дэлгэрэнгүй мэдээллээ оруулна уу"
              />
              <button
                type="submit"
                className="bg-[#5F2DF5] flex px-1 py-2.5 items-center justify-center gap-2 rounded-lg"
              >
                <Check width={16} height={16} stroke="white" />
                <p className="text-white font-semibold">Хадгалах</p>
              </button>
            </Form>
          )}
        </Formik>
      </DialogHeader>
    </DialogContent>
  );
};

export default AddPinPointContent;
