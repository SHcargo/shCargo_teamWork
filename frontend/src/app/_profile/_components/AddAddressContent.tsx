"use client";

import React, { useState, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import dynamic from "next/dynamic";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "@/app/providers/UserProvider";
import { useDeliveryAddress } from "@/app/providers/DeliveryAddressProvider";
import SelectField from "./SelectField";
import TextareaField from "@/app/deliveryAddress/components/TextAreaField";
import { districts } from "@/app/deliveryAddress/utils/address";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });

const validationSchema = Yup.object({
  detail: Yup.string().required("Дэлгэрэнгүй мэдээлэл шаардлагатай"),
  district: Yup.string().required("Дүүрэг сонгоно уу"),
  khoroo: Yup.string().required("Хороо сонгоно уу"),
});

const AddAddressContent = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [accuracy, setAccuracy] = useState(0);
  const [locationError, setLocationError] = useState("");
  const { userId } = useUser();
  const { fetchAddresses } = useDeliveryAddress();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  // Get user location once on mount
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Таны төхөөрөмж байршил тогтоох боломжгүй байна");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocation({ lat: coords.latitude, lng: coords.longitude });
        setAccuracy(coords.accuracy);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Байршил тогтоохыг зөвшөөрөөгүй байна");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Байршлын мэдээлэл олдсонгүй");
            break;
          case error.TIMEOUT:
            setLocationError("Байршил тогтоох хугацаа хэтэрлээ");
            break;
          default:
            setLocationError("Байршил тогтооход алдаа гарлаа");
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  const hasAccurateLocation = location !== null && accuracy < 100;
  const showManualInput = !hasAccurateLocation || locationError !== "";

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Шинэ хаяг бүртгэх</DialogTitle>
        <DialogDescription>Доорх мэдээллийг бөглөнө үү</DialogDescription>

        <Formik
          enableReinitialize
          initialValues={{
            lat: location?.lat || 0,
            lng: location?.lng || 0,
            detail: "",
            district: "",
            khoroo: "",
            accuracy,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/deliveryAddress/${userId}`,
                values
              );
              toast.success("Амжилттай шинэ хаяг нэмлээ!");
              fetchAddresses();
              dialogCloseRef.current?.click();
            } catch (error) {
              toast.error("Хаяг бүртгэхэд алдаа гарлаа");
              console.error(error);
            }
            setSubmitting(false);
          }}
        >
          {({ setFieldValue, values, isSubmitting }) => (
            <Form className="flex flex-col gap-6 mt-6">
              {hasAccurateLocation && (
                <div className="border rounded-md overflow-hidden">
                  <LeafletMap latitude={values.lat} longitude={values.lng} />
                </div>
              )}

              {showManualInput && (
                <div className="border-t pt-4 mt-4 flex flex-col gap-4">
                  <SelectField
                    name="district"
                    label="Дүүрэг"
                    placeholder="Дүүрэг сонгоно уу"
                    options={Object.keys(districts)}
                    onChange={(val) => {
                      setSelectedDistrict(val);
                      setFieldValue("khoroo", "");
                    }}
                    value={values.district}
                  />

                  <SelectField
                    name="khoroo"
                    label="Хороо"
                    placeholder="Хороо сонгоно уу"
                    options={
                      selectedDistrict && selectedDistrict in districts
                        ? districts[selectedDistrict as keyof typeof districts]
                        : []
                    }
                    disabled={!selectedDistrict}
                    value={values.khoroo}
                  />
                </div>
              )}

              <TextareaField
                name="detail"
                label="Дэлгэрэнгүй мэдээлэл"
                placeholder="Хотхон, байр, орц, код, тоот..."
              />

              <DialogClose asChild disabled={isSubmitting}>
                <button
                  ref={dialogCloseRef}
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black flex items-center justify-center gap-2 py-2.5 rounded-lg cursor-pointer hover:bg-[#303030] transition disabled:opacity-50"
                >
                  <span className="text-white font-semibold text-sm">
                    Хадгалах
                  </span>
                </button>
              </DialogClose>
            </Form>
          )}
        </Formik>
      </DialogHeader>
    </DialogContent>
  );
};

export default AddAddressContent;
