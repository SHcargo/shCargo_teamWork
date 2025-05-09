import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import TextareaField from "@/app/deliveryAddress/components/TextAreaField";
import { useUser } from "@/app/providers/UserProvider";
import { useDeliveryAddress } from "@/app/providers/DeliveryAddressProvider";
import axios from "axios";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import SelectField from "./SelectField";
import { districts } from "@/app/deliveryAddress/utils/address";
import * as Yup from "yup";
import { useRef } from "react";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
});

interface LocationType {
  lat: number;
  lng: number;
}

const AddAddressContent = () => {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [locationError, setLocationError] = useState("");
  const [accuracy, setAccuracy] = useState(0);
  const { userId } = useUser();
  const { fetchAddresses } = useDeliveryAddress();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getLocation = (setFieldValue: (field: string, value: any) => void) => {
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("Таны төхөөрөмж байршил тогтоох боломжгүй байна");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setFieldValue("lat", latitude);
        setFieldValue("lng", longitude);
        setFieldValue("accuracy", accuracy);
        setAccuracy(accuracy);
      },
      (err) => {
        setLocationError(getLocationErrorMessage(err));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const getLocationErrorMessage = (error: GeolocationPositionError) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return "Байршил тогтоохыг зөвшөөрөөгүй байна";
      case error.POSITION_UNAVAILABLE:
        return "Байршлын мэдээлэл олдсонгүй";
      case error.TIMEOUT:
        return "Байршил тогтоох хугацаа хэтэрлээ";
      default:
        return "Байршил тогтооход алдаа гарлаа";
    }
  };

  const validationSchema = Yup.object({
    detail: Yup.string().required("Дэлгэрэнгүй мэдээлэл шаардлагатай"),
    district: Yup.string().required("Дүүрэг сонгоно уу"),
    khoroo: Yup.string().required("Хороо сонгоно уу"),
  });

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
            district: "",
            khoroo: "",
            accuracy: accuracy,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/deliveryAddress/${userId}`,
                {
                  lat: values.lat,
                  lng: values.lng,
                  detail: values.detail,
                  district: values.district,
                  khoroo: values.khoroo,
                  accuracy: values.accuracy,
                }
              );
              fetchAddresses();
              toast.success("Амжилттай шинэ хаяг нэмлээ!");
              dialogCloseRef.current?.click();
            } catch (error) {
              toast.error("Хаяг бүртгэхэд алдаа гарлаа");
              console.error("Error creating address", error);
            }
            setSubmitting(false);
          }}
        >
          {({ setFieldValue, values, isSubmitting }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
              getLocation(setFieldValue);
            }, [setFieldValue]);

            const hasAccurateLocation = location && accuracy < 100;
            const showManualInput = !hasAccurateLocation || locationError;

            return (
              <Form className="flex flex-col gap-6 mt-6">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    {accuracy < 100 ? (
                      <div className="border rounded-md overflow-hidden">
                        <LeafletMap
                          latitude={values.lat}
                          longitude={values.lng}
                        />
                      </div>
                    ) : (
                      <div className="text-sm text-amber-600">
                        Байршлын нарийвчлал бага байгаа учир доорх мэдээллийг
                        бөглөнө үү.
                      </div>
                    )}
                  </div>
                </div>

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
                          ? districts[
                              selectedDistrict as keyof typeof districts
                            ]
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
            );
          }}
        </Formik>
      </DialogHeader>
    </DialogContent>
  );
};

export default AddAddressContent;
